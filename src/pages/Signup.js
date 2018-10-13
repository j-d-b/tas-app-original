import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FormPage, FormBox, FormTitle, FormInput, FormSubmit, FormLineAfter } from '../components/Form';
import Logo from '../components/Logo';

const LoginLink = styled(Link)`
  font-weight: 600;
  color: #fff;

  &:hover {
    color: #efefef;
  }
`;

const SIGN_UP = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      name
    }
  }
`;

class Signup extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '', name: '', company: '', emailSentTo: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(addUser, event) {
    event.preventDefault();
    addUser({
      variables: {
        input: {
          password: this.state.password,
          email: this.state.email,
          name: this.state.name,
          company: this.state.company
        }
      }
    });
  }

  onSuccess() {
    this.setState({ emailSentTo: this.state.email });
    this.setState({ email: '', password: '', name: '', company: '' });
  }

  render() {
    return (
      <Mutation mutation={SIGN_UP} onCompleted={this.onSuccess}>
        {(addUser, { error, data }) => (
          <FormPage>
            <Logo />
            <FormBox>
              <FormTitle>Sign Up</FormTitle>

              <form onSubmit={e => this.handleSubmit(addUser, e)}>
                <FormInput
                  name="name"
                  type="text"
                  value={this.state.name}
                  placeholder="Full Name"
                  onChange={this.handleInputChange}
                  required
                />
                <FormInput
                  name="email"
                  type="email"
                  value={this.state.email}
                  placeholder="Email Address"
                  onChange={this.handleInputChange}
                  required
                />
                <FormInput
                  name="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handleInputChange}
                  required
                />
                <FormInput
                  name="company"
                  type="text"
                  value={this.state.company}
                  placeholder="Company"
                  onChange={this.handleInputChange}
                  required
                />
                <FormSubmit type="submit" value="Sign Up" />
              </form>

              {data && <div><p>Signup success, confirmation and next steps have been sent to <i>{this.state.emailSentTo}</i></p></div>}
              {error && <p>{error.message}</p>}
            </FormBox>
            <FormLineAfter>Already a user? <LoginLink to="/login">Log In</LoginLink></FormLineAfter>
          </FormPage>
        )}
      </Mutation>
    );
  }
}

export default Signup;

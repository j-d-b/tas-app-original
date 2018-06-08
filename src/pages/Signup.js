import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FormPage, FormBox, FormTitle, FormInput, FormSubmit, LineAfter } from '../components/Form';
import Logo from '../components/Logo';

const LoginLink = styled(Link)`
  font-weight: 600;
  color: #fff;

  &:hover {
    color: #efefef;
  }
`;

const signupMutation = gql`
  mutation addUser($email: ID!, $password: String!, $userDetails: UserDetails!) {
    addUser(email: $email, password: $password, userDetails: $userDetails)
  }
`;

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', name: '', company: '', emailSentTo: '' };
    this.updateInput = this.updateInput.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  updateInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(addUser, event) {
    event.preventDefault();
    addUser({
      variables: {
        email: this.state.email,
        password: this.state.password,
        userDetails: {
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
      <Mutation mutation={signupMutation} onCompleted={this.onSuccess}>
        {(addUser, { error, data }) => (
          <FormPage>
            <Logo />
            <FormBox>
              <FormTitle>Sign Up</FormTitle>

              <form onSubmit={e => this.handleSubmit(addUser, e)}>
                <FormInput name="name" type="text" value={this.state.name} placeholder="Full Name" onChange={this.updateInput} />
                <FormInput name="email" type="email" value={this.state.email} placeholder="Email Address" onChange={this.updateInput} />
                <FormInput name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.updateInput} />
                <FormInput name="company" type="text" value={this.state.company} placeholder="Company" onChange={this.updateInput} />
                <FormSubmit type="submit" value="Sign Up" />
              </form>

              {data && <div><p>Signup success, confirmation has been sent to <i>{this.state.emailSentTo}</i></p>Go <Link to="/login">here</Link> to login</div>}
              {error && <p>{error.toString()}</p>}
            </FormBox>
            <LineAfter>Already a user? <LoginLink to="/login">Log In</LoginLink></LineAfter>
          </FormPage>
        )}
      </Mutation>
    );
  }
}

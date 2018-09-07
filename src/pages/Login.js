import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FormPage, FormBox, FormTitle, FormInput, FormSubmit, FormLineAfter } from '../components/Form';
import Logo from '../components/Logo';

const ForgotPassLink = styled(Link)`
  margin-top: 0.9rem;
  display: block;
  font-size: 0.85rem;
  color: #999;

  &:hover {
    color: #888;
  }
`;

const SignupLink = styled(Link)`
  font-weight: 600;
  color: #fff;

  &:hover {
    color: #efefef;
  }
`;

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event, login) {
    event.preventDefault();
    login({ variables: { email: this.state.email, password: this.state.password }});
  }

  render() {
    return (
      <Mutation mutation={loginMutation} onCompleted={({ login }) => this.props.auth.login(login)}>
        {(login, { error, data }) => (
          <FormPage>
            <Logo />
            <FormBox>
              <FormTitle>Log In</FormTitle>

              <form onSubmit={e => this.handleSubmit(e, login)}>
                <FormInput name="email" type="email" value={this.state.email} placeholder="Email Address" onChange={this.handleInputChange} required />
                <FormInput name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} required />
                <FormSubmit type="submit" value="Log In" />
                <ForgotPassLink to="/reset-password">Forgot password?</ForgotPassLink>
              </form>

              {error && <p>{error.toString()}</p>}
              {data && <p>Log in successful, redirecting...</p>}
            </FormBox>
            <FormLineAfter>Don't have an account? <SignupLink to="/signup">Sign Up</SignupLink></FormLineAfter>
          </FormPage>
        )}
      </Mutation>
    );
  }
}

export default Login;

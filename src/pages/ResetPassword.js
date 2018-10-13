import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { FormPage, FormBox, FormTitle, FormInput, FormSubmit } from '../components/Form';
import Logo from '../components/Logo';

const SEND_RESET_LINK = gql`
  mutation sendResetPasswordLink($input: SendResetPasswordLinkInput!) {
    sendResetPasswordLink(input: $input)
  }
`;

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', emailSentTo: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(sendResetPasswordLink, event) {
    event.preventDefault();
    sendResetPasswordLink({ variables: { input: { email: this.state.email } } });
  }

  onSuccess() {
    this.setState({ emailSentTo: this.state.email });
    this.setState({ email: '' });
  }

  render() {
    return (
      <Mutation mutation={SEND_RESET_LINK} onCompleted={this.onSuccess}>
        {(sendResetPassLink, { error, data }) => (
          <FormPage>
            <Logo />
            <FormBox>
              <FormTitle>Reset Password</FormTitle>

              <form onSubmit={e => this.handleSubmit(sendResetPassLink, e)}>
                <FormInput
                  name="email"
                  type="email"
                  value={this.state.email}
                  placeholder="Email Address"
                  onChange={this.handleInputChange}
                  required
                />
                <FormSubmit type="submit" value="Send Reset Link" />
              </form>

              {error && <p>{error.toString()}</p>}
              {data && <div><p>Password reset email has been sent to <i>{this.state.emailSentTo}</i></p>Go <Link to="/login">here</Link> to login</div>}
            </FormBox>
          </FormPage>
        )}
      </Mutation>
    );
  }
}

export default ResetPassword;

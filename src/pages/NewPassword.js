import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { FormPage, FormBox, FormTitle, FormInput, FormSubmit } from '../components/Form';
import Logo from '../components/Logo';

const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export default class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(resetPassword, event) {
    event.preventDefault();
    resetPassword({ variables: { input: { newPassword: this.state.newPassword, resetToken: this.props.match.params.token } } });
    this.setState({ newPassword: '' });
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Mutation mutation={RESET_PASSWORD}>
        {(resetPassword, { error, data }) => (
          <FormPage>
            <Logo />
            <FormBox>
              <FormTitle>Set New Password</FormTitle>

              <form onSubmit={e => this.handleSubmit(resetPassword, e)}>
                <FormInput
                  name="newPassword"
                  type="password"
                  value={this.state.newPassword}
                  placeholder="New Password"
                  onChange={this.handleInputChange}
                  required
                />
                <FormSubmit type="submit" value="Change Password" />
              </form>

              {error && <p>{error.message}</p>}
              {data && <div><p>Password for <i>{jwtDecode(this.props.match.params.token).userEmail}</i> has been changed.</p>Go <Link to="/login">here</Link> to login</div>}
            </FormBox>
          </FormPage>
        )}
      </Mutation>
    );
  }
}

import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CenterOnPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    this.setState({ emailSentTo: this.state.email })
    this.setState({ email: '', password: '', name: '', company: '' });
  }

  render() {
    return (
      <Mutation mutation={signupMutation} onCompleted={this.onSuccess}>
        {(addUser, { error, data }) => (
          <CenterOnPage>
            <h3>Sign up</h3>
            <form onSubmit={e => this.handleSubmit(addUser, e)}>
              <div>
                Full Name
                <input name="name" type="text" value={this.state.name} onChange={this.updateInput} />
              </div>
              <div>
                Email
                <input name="email" type="text" value={this.state.email} onChange={this.updateInput} />
              </div>
              <div>
                Password
                <input name="password" type="text" value={this.state.password} onChange={this.updateInput} />
              </div>
              <div>
                Company
                <input name="company" type="text" value={this.state.company} onChange={this.updateInput} />
              </div>
              <input type="submit" value="Signup" />
            </form>
            <Link to="/login">Already a user? Log in here</Link>
            {error && <p>{error.toString()}</p>}
            {data && <div><p>Signup success, confirmation has been sent to <i>{this.state.emailSentTo}</i></p><Link to="/login">Login Here</Link></div>}
          </CenterOnPage>
        )}
      </Mutation>
    );
  }
}

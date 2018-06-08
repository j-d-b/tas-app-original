import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const CenterOnPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loginMutation = gql`
  mutation login($email: ID!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(login, event) {
    event.preventDefault();
    login({ variables: { email: this.state.email, password: this.state.password }});
  }

  render() {
    return (
      <Mutation mutation={loginMutation} onCompleted={({ login }) => this.props.auth.login(login)}>
        {(login, { error, data }) => (
          <CenterOnPage>
            <form onSubmit={e => this.handleSubmit(login, e)}>
              <div>
                Email
                <input name="email" type="text" value={this.state.email} onChange={this.updateInput} />
              </div>
              <div>
                Password
                <input name="password" type="text" value={this.state.password} onChange={this.updateInput} />
              </div>
              <input type="submit" value="Login" />
            </form>
            {error && <p>{error.toString()}</p>}
            {data && <p>Login success</p>}
          </CenterOnPage>
        )}
      </Mutation>
    );
  }
}

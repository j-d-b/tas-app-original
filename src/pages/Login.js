import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Box from '../components/Box';

const CenterOnPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const loginMutation = gql`
  mutation login($email: ID!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const CurrentStatus = ({ auth }) => {
  const isAuth = auth.isAuthenticated();
  if (isAuth) {
    return (
      <Box textAlign="center">
        <h4>You are logged in as <i>{auth.getUser()}</i></h4>
        <Link to="/">Go to TAS App</Link>
        <div>
          <button onClick={auth.logout}>Logout</button>
        </div>
      </Box>
    );
  }

  return isAuth ? <div>You are already logged in</div> : null;
};


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
            {this.props.auth.isAuthenticated()
              ? <CurrentStatus auth={this.props.auth} />
              : <div>
                  <h3>Login</h3>
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
                  <Link to="/signup">New user? Register here</Link>
                  <div><a href="">forgot password?</a></div>
                  {error && <p>{error.toString()}</p>}
                  {data && <p>Login success</p>}
                </div>
            }
          </CenterOnPage>
        )}
      </Mutation>
    );
  }
}

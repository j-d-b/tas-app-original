import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/Navbar';

import Signup from './pages/Signup';
import Login from './pages/Login';
import ResetPass from './pages/ResetPass';
import Dashboard from './pages/Dashboard';
import Scheduler from './pages/Scheduler';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import NoAccess from './pages/NoAccess';

const PageBody = styled.div`
  height: 100vh;
`;

// wraps react-router Route component
// checks auth and redirects to login page if not authenticated
// checks user role and disallows access to certain pages
function PrivateRoute({ component: Component, ...rest }) {
  const isAuth = rest.auth.isAuthenticated();

  if (!isAuth || !rest.requiredRole) {
    return <Route {...rest} render={props => isAuth ? <Component {...rest} /> : <Redirect to="/login" />} />
  };

  return <Route {...rest} render={props => rest.auth.isAuthorized(rest.requiredRole) ? <Component {...rest} /> : <NoAccess />} />;
}

// returns a Redirect to the users home route given user role
function getHomeRoute(auth) {
  const role = auth.getRole();
  return (role !== 'customer') ? <Redirect to="/dashboard" /> : <Redirect to="/scheduler" />;
}

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <PageBody>
          <Navbar auth={this.props.auth} />
          <Switch>
            <Route exact path="/" render={() => this.props.auth.isAuthenticated() ? getHomeRoute(this.props.auth) : <Redirect to="/login" />} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" render={() => this.props.auth.isAuthenticated() ? getHomeRoute(this.props.auth) : <Login auth={this.props.auth} />} />
            <Route path="/reset-password" component={ResetPass} />
            <PrivateRoute path="/dashboard" component={Dashboard} auth={this.props.auth} requiredRole="operator" />
            <PrivateRoute path="/scheduler" component={Scheduler} auth={this.props.auth} />
            <PrivateRoute path="/admin" component={Admin} auth={this.props.auth} requiredRole="admin" />
            <PrivateRoute path="/settings" component={Settings} auth={this.props.auth} />
            <PrivateRoute component={NotFound} auth={this.props.auth} />
          </Switch>
        </PageBody>
      </BrowserRouter>
    );
  }
}

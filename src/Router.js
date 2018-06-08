import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/Navbar';
import Scheduler from './pages/Scheduler';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const PageBody = styled.div`
  background-color: #eee;
`;

function PrivateRoute({ component: Component, ...rest }) {
  const isAuth = rest.auth.isAuthenticated();

  if (!isAuth || !rest.requiredRole) {
    return <Route {...rest} render={props => isAuth ? <Component {...rest} /> : <Redirect to="/login" />} />
  };

  return <Route {...rest} render={props => isAuth && rest.auth.isAuthorized(rest.requiredRole) ? <Component {...rest} /> : <h1>No Access</h1>} />;
}

function routeHome(auth) {
  const role = auth.getRole();
  if (role !== 'customer') return <Redirect to="/dashboard" />;
  return <Redirect to="/scheduler" />;
}

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <PageBody>
          <Navbar auth={this.props.auth} />
          <Switch>
            <Route exact path="/" render={() => this.props.auth.isAuthenticated() ? routeHome(this.props.auth) : <Redirect to="/login" />} />
            <Route path="/login" render={() => <Login auth={this.props.auth} />} />
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

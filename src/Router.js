import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/Navbar';
import Box from './components/Box';

import Signup from './pages/Signup';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Dashboard from './pages/Dashboard';
import Scheduler from './pages/Scheduler';
import Config from './pages/Config';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import NoAccess from './pages/NoAccess';

// wraps react-router `Route` component
// checks auth and redirects to login page if not authenticated
// checks user role and disallows access to certain pages
// adds wrapper to rendered route
function PrivateRoute({ component: Component, wrapper: Wrapper, ...rest }) {
  const isAuth = rest.auth.isAuthenticated();

  if (!isAuth || !rest.requiredRole) {
    return <Route {...rest} render={props => isAuth ? <Wrapper><Component {...rest} /></Wrapper> : <Redirect to="/login" />} />
  };

  return <Route {...rest} render={props => rest.auth.isAuthorized(rest.requiredRole) ? <Wrapper><Component {...rest} /></Wrapper> : <NoAccess />} />;
}

// returns a Redirect to the users home route given user role
function getHomeRoute(auth) {
  const role = auth.getRole();
  return (role === 'CUSTOMER') ? <Redirect to="/scheduler" /> : <Redirect to="/dashboard" />;
}

// for the page body below the fixed width navbar
const BelowNav = styled.div`
  height: calc(100% - 50px);
`;

export default ({ auth }) => (
  <BrowserRouter>
    <Box height="100%">
      <Route path="/(dashboard|scheduler|config|admin|settings)/" render={() => <Navbar auth={auth} />} />
      <Switch>
        <Route exact path="/" render={() => auth.isAuthenticated() ? getHomeRoute(auth) : <Redirect to="/login" />} />
        <Route path="/login" render={() => auth.isAuthenticated() ? getHomeRoute(auth) : <Login auth={auth} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/new-password/:token" component={NewPassword} />
        <PrivateRoute path="/dashboard" component={Dashboard} auth={auth} requiredRole="OPERATOR" wrapper={BelowNav} />
        <PrivateRoute path="/scheduler" component={Scheduler} auth={auth} wrapper={BelowNav} />
        <PrivateRoute path="/config" component={Config} auth={auth} requiredRole="OPERATOR" wrapper={BelowNav} />
        <PrivateRoute path="/admin" component={Admin} auth={auth} requiredRole="ADMIN" wrapper={BelowNav} />
        <PrivateRoute path="/settings" component={Settings} auth={auth} wrapper={BelowNav} />
        <PrivateRoute component={NotFound} auth={auth} wrapper={(props) => <div>{props.children}</div>} /> { /* TODO */ }
      </Switch>
    </Box>
  </BrowserRouter>
);

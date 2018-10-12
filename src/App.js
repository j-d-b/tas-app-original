import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { injectGlobal, ThemeProvider } from 'styled-components';
import styledNormalize from 'styled-normalize';

import Router from './Router';
import Auth from './Auth';

const theme = {
  main: 'limegreen',
  light: '#36bfc1',
  dark: '#18ab18',
  accent: 'tomato',
  navBreakpoint: '620px'
};

const setGlobalStyles = () => injectGlobal`
  ${styledNormalize};

  html {
    height: 100%;
  }

  body {
    height: 100%;
    padding: 0;
    font-family: helvetica, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

const auth = new Auth();

const httpLink = createHttpLink({
  uri: 'https://tas-server-zgrwsbgtri.now.sh/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class App extends Component {
  constructor() {
    super();
    setGlobalStyles();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Router auth={auth} />
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default App;

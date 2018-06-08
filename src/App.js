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
  main: '#365AA1',
  light: '#52A4E6',
  accent: 'tomato',
  navBreakpoint: '620px'
};

const setGlobalStyles = () => injectGlobal`
  ${styledNormalize};

  body {
    padding: 0;
    font-family: helvetica, sans-serif;
  }
`;

const auth = new Auth();

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider, gql, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: { authorization: `Bearer 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` }
}));

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const client = new ApolloClient({
  link: setAuthorizationLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

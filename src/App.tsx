import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { createGlobalStyle } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CurrencyContextProvider from './context/currency.context';
import MainPage from './pages/MainPage';
import FullProductInfo from './pages/FullProductInfo';
import ShopCardContextProvider from './context/shopCart.context';
import FullShopCard from './pages/FullShopCart';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <CurrencyContextProvider>
          <ShopCardContextProvider>
            <Switch>
              <Route path="/product" component={FullProductInfo} />
              <Route path="/shopcart" component={FullShopCard} />
              <Route path="/:category" component={MainPage} />
              <Route path="/" component={MainPage} />
            </Switch>
          </ShopCardContextProvider>
        </CurrencyContextProvider>
        <GlobalStyle />
      </ApolloProvider>
    </Router>
  );
}

export default App;

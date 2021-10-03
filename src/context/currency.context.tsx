import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { GET_ALL_INFO } from '../graphql/query';

export const CurrencyContext = React.createContext({});

class CurrencyContextProvider extends Component<any, any> {
  state: any = {};

  render() {
    return (
      <CurrencyContext.Provider value={{
        currency: this.state.currency || this.props?.data?.currencies?.[0],
        setCurrency: (newCurrency: string) => this.setState({ currency: newCurrency }),
        currencies: this.props?.data?.currencies,
      }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default graphql(GET_ALL_INFO)(CurrencyContextProvider);

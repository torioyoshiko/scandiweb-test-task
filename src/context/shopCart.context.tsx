import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { isEqual } from 'lodash';
import { GET_ALL_INFO } from '../graphql/query';
import {
  MainPageQuery_category_products_attributes as attribute,
} from '../graphql/__generated__/MainPageQuery';
import { CurrencyContext } from './currency.context';

interface Product {
  id: string,
  selectedAttributes: object,
  photo: string,
  allAttributes: attribute[],
  price: any,
  quantity: number
}

interface ShopCartState {
  addProduct: (id: string, selectedAttributes: object, allAttributes: object | null | undefined, price: any, photo: string) => void,
  removeProduct: (id: string, selectedAttributes: object, allAttributes: object | null | undefined, price: any, photo: string) => void,
  products: Product[]
}

interface ShopCartInternalState {
  products: Product[]
}

export const ShopCartContext = React.createContext({} as ShopCartState);

class ShopCartContextProvider extends Component<any, any> {
  state: ShopCartInternalState = { products: [] };

  static contextType = CurrencyContext;

  addProduct(id: string, selectedAttributes: object, allAttributes: any, price: any, photo: string) {
    const existingProduct = this.state.products.find((x: Product) => x.id === id && isEqual(x.selectedAttributes, selectedAttributes));

    if (existingProduct) {
      existingProduct.quantity += 1;
      this.setState({ products: this.state.products.slice(0) });
    } else {
      this.state.products.push({
        id,
        selectedAttributes,
        allAttributes,
        price,
        photo,
        quantity: 1,
      });
      this.setState({ products: this.state.products.slice(0) });
    }
  }

  removeProduct(id: string, selectedAttributes: object, allAttributes: any) {
    const existingProduct = this.state.products.find((x: Product) => x.id === id && isEqual(x.selectedAttributes, selectedAttributes) && isEqual(x.allAttributes, allAttributes));

    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
      this.setState({ products: this.state.products.slice(0) });
    } else {
      this.setState(
        {
          products: this.state.products.filter(
            (product) => product.id !== id || !isEqual(product.selectedAttributes, selectedAttributes) || !isEqual(product.allAttributes, allAttributes),
          ),
        },
      );
    }
  }

  render() {
    return (
      <ShopCartContext.Provider
        value={{
          addProduct: (id, selectedAttributes, allAttributes, price, photo) => this.addProduct(id, selectedAttributes, allAttributes, price, photo),
          removeProduct: (id, selectedAttributes, allAttributes) => this.removeProduct(id, selectedAttributes, allAttributes),
          products: this.state.products.map((product) => ({
            ...product,
            price: product.price.find((price: any) => price?.currency === this.context.currency).amount,
          })),
        }}
      >
        {this.props.children}
      </ShopCartContext.Provider>
    );
  }
}

export default graphql(GET_ALL_INFO)(ShopCartContextProvider);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { CurrencyContext } from '../context/currency.context';
import { ShopCartContext } from '../context/shopCart.context';
import ProductInCart from "../components/ProductInCart";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  flex: 1;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Cart = styled.p`
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
`;

const ProductsBlock = styled.div`
  max-width: 1200px;
  padding-left: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;


class FullShopCart extends Component<any, any> {
  state = { showOverlay: false };

  static contextType = CurrencyContext;

  render() {
    const showOverlay = (state: boolean) => {
      this.setState({ showOverlay: state });
    }

    return (
      <ShopCartContext.Consumer>
        {({ products }) => {
          return (
            <MainDiv>
              <Header showOverlay={showOverlay}/>
              <Container>
                {this.state.showOverlay && <Overlay/>}
                <ProductsBlock>
                  <Cart>Cart</Cart>
                  {products.map((product) => (<ProductInCart product={product}/>))}
                </ProductsBlock>
              </Container>
            </MainDiv>
          );
        }}
      </ShopCartContext.Consumer>
    );
  }
}

export default withRouter(FullShopCart);

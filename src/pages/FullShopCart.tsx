import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { values } from 'lodash';
import Header from '../components/Header';
import { CurrencyContext } from '../context/currency.context';
import { ShopCartContext } from '../context/shopCart.context';

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

const Product = styled.div`
  border-top: #E5E5E5 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
`;

const Info = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
`;

const Name = styled.div`
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
`;

const Price = styled.div`
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;
`;

const Attribute = styled.div`
  border: solid 1px black;
  margin: 0 4px;
  padding: 4px 6px;
  width: 63px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsAndPhoto = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ButtonBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Quantity = styled.div`
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  border: solid 1px black;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoBlock = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
`;

const Miniature = styled.img`
  width: 141px;
  height: 185px;
  object-fit: contain;
`;

class FullShopCart extends Component<any, any> {
  state = { showOverlay: false };

  static contextType = CurrencyContext;

  render() {
    const showOverlay = (state: boolean) => {
      this.setState({ showOverlay: state });
    };

    return (
      <ShopCartContext.Consumer>
        {({ addProduct, removeProduct, products }) => (
          <MainDiv>
            <Header showOverlay={showOverlay} />
            <Container>
              {this.state.showOverlay && <Overlay />}
              <ProductsBlock>
                <Cart>Cart</Cart>
                {products.map((product) => (
                  <Product key={product.id}>
                    <Info>
                      <Name>{product.id}</Name>
                      <Price>{this.context.currency + product.price * product.quantity}</Price>
                      <div>
                        {values(product?.selectedAttributes).map((attribute) => (
                          <Attribute>{attribute}</Attribute>))}
                      </div>
                    </Info>
                    <ButtonsAndPhoto>
                      <ButtonBlock>
                        <Button
                          onClick={() => addProduct(product.id, product.selectedAttributes, product.allAttributes, product.price, product.photo)}
                        >
                          +
                        </Button>
                        <Quantity>{product?.quantity}</Quantity>
                        <Button
                          onClick={() => removeProduct(product.id, product.selectedAttributes, product.allAttributes, product.price, product.photo)}
                        >
                          -
                        </Button>
                      </ButtonBlock>
                      <PhotoBlock>
                        <Miniature src={product?.photo} />
                      </PhotoBlock>
                    </ButtonsAndPhoto>
                  </Product>
                ))}
              </ProductsBlock>
            </Container>
          </MainDiv>
        )}
      </ShopCartContext.Consumer>
    );
  }
}

export default withRouter(FullShopCart);

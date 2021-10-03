import React, { Component } from 'react';
import styled from 'styled-components';
import { values } from 'lodash';
import { withRouter } from 'react-router-dom';
import { ShopCartContext } from '../context/shopCart.context';
import { CurrencyContext } from '../context/currency.context';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 325px;
  background-color: white;
  z-index: 10;
  margin-top: 30px;
`;

const ContentContainer = styled.div`
  margin-left: 13px;
  margin-right: 13px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Bag = styled.p`
  font-weight: bold;
`;

const AllProducts = styled.div`
  display: flex;
  flex-direction: column
`;

const Product = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 45px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.div`
  font-family: Raleway, serif;
  font-weight: 300;
  font-size: 16px;
`;

const AttributeSet = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Attribute = styled.div`
  height: 24px;
  border: solid 1px black;
  margin: 0 4px;
  padding: 4px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Amount = styled.div`
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonsAndPhoto = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Quantity = styled.div`
  height: 24px;
  width: 24px;
  text-align: center;
`;

const Button = styled.div`
  border: solid 1px black;
  width: 24px;
  height: 24px;
  text-align: center;
`;

const Miniature = styled.img`
  padding-left: 10px;
  width: 105px;
  height: 137px;
  object-fit: contain;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
`;

const TotalAmount = styled.p`
  font-family: Raleway,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
`;

const ViewBag = styled.button`
  border: 1px solid #1D1F22;
  padding: 10px 25px;
  background-color: white;
  margin-right: 12px;
  width: 140px;
  height: 43px;
  cursor: pointer;
`;

const CheckOut = styled.button`
  background-color: #5ECE7B;
  border: 1px solid #5ECE7B;
  padding: 10px 25px;
  color: white;
  width: 140px;
  height: 43px;
`;

class ShopCartMini extends Component<any, any> {
  static contextType = CurrencyContext;

  render() {
    return (
      <ShopCartContext.Consumer>
        {
        ({ addProduct, removeProduct, products }) => (
          <MainContainer>
            <ContentContainer>
              <Text>
                <Bag>My bag</Bag>
                {' '}
                <p>
                  ,
                  {products.length}
                  {' '}
                  items
                </p>
              </Text>
              <AllProducts>
                {products.map((product) => (
                  <Product key={product?.id + product.photo}>
                    <ProductInfo>
                      <ProductName>{product?.id}</ProductName>
                      <Amount>{this.context.currency + product?.price.toString()}</Amount>
                      <AttributeSet>
                        {values(product?.selectedAttributes).map((attribute) => (<Attribute key={attribute}>{attribute}</Attribute>))}
                      </AttributeSet>
                    </ProductInfo>
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
                      <div>
                        <Miniature src={product?.photo} />
                      </div>
                    </ButtonsAndPhoto>
                  </Product>
                ))}
              </AllProducts>
              <Total>
                <Bag>Total: </Bag>
                <TotalAmount>
                  {this.context.currency + products.reduce((sum, product) => sum + product.price * product.quantity, 0).toString()}
                </TotalAmount>
              </Total>
            </ContentContainer>
            <Buttons>
              <ViewBag onClick={() => this.props.history.push('/shopcart')}>VIEW BAG</ViewBag>
              <CheckOut>CHECK OUT</CheckOut>
            </Buttons>
          </MainContainer>
        )
      }
      </ShopCartContext.Consumer>
    );
  }
}

export default withRouter(ShopCartMini);

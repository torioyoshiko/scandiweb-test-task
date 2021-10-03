import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CurrencyContext } from '../context/currency.context';
import { MainPageQuery_category_products as MainPageQueryCategoryProducts } from '../graphql/__generated__/MainPageQuery';
import { getPrice } from '../Utils';

const MainDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 300px;
  font-family: Raleway, serif;
  padding: 20px;
  margin: 0 0 100px 0;

  &:hover {
    box-shadow: 0 5px 35px rgba(168, 172, 176, 0.19);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-items: center;
`;

const Image = styled.img`
  height: 330px;
  width: 100%;
  max-width: 350px;
  object-fit: contain;
`;

const OutOfStock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background: #FFFFFF;
  opacity: 0.5;
`;

const Name = styled.p`
  padding-top: 25px;
`;

const Price = styled.p`
  margin: 0;
  font-weight: 500;
`;

interface ProductCartProps {
  product: MainPageQueryCategoryProducts
}

class ProductCart extends Component<RouteComponentProps<{}> & ProductCartProps> {
  static contextType = CurrencyContext;

  render() {
    const productInfo = this.props?.product;
    let price = null;
    const available = productInfo?.inStock;

    price = getPrice(productInfo.prices, this.context.currency);

    return (
      <div>
        <MainDiv onClick={() => {
          if (available) {
            this.props.history.push(`/product?${productInfo.name}`);
          }
        }}
        >
          <ImageContainer>
            <Image src={productInfo?.gallery?.[0]!} />
            {!available && <OutOfStock>Out of stock</OutOfStock>}
          </ImageContainer>
          <Name>{productInfo.name}</Name>
          <Price>{`${this.context.currency} ${price?.toString()}`}</Price>
        </MainDiv>
      </div>
    );
  }
}

export default withRouter(ProductCart);

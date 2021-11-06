import React, { Component } from 'react';
import { ChildDataProps, graphql, QueryControls } from '@apollo/client/react/hoc';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { sanitize } from 'dompurify'
import { CurrencyContext } from '../context/currency.context';
import Header from '../components/Header';
import { GET_ALL_INFO } from '../graphql/query';
import { Attribute } from '../components/Attribute';
import { MainPageQuery, MainPageQuery_category_products as Product } from '../graphql/__generated__/MainPageQuery';
import { ShopCartContext } from '../context/shopCart.context';
import { getPrice } from '../Utils';
import {compact} from "lodash";

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

const ProductInfo = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  margin-left: 15px;

  @media (max-width: 1250px) {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 0;
  }
`;

const AllPhotos = styled.div`
  display: flex;
`;

const Miniatures = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  cursor: pointer;

  @media (max-width: 1250px) {
    margin-left: 10px;
  }
`;

const Miniature = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 30px;

  &:hover {
    box-shadow: 0 5px 35px rgba(168, 172, 176, 0.19);
  }
`;

const MainPhoto = styled.div`
  display: flex;
  margin-right: 100px;
  margin-left: 100px;

  @media (max-width: 1250px) {
    margin-right: 0;
    margin-left: 0;
  }
`;

const Photo = styled.img`
  max-width: 511px;
  max-height: 610px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1250px) {
    margin-left: 10px;
  }
`;

const ProductName = styled.div`
  font-family: Raleway, serif;
  font-weight: 500;
  font-size: 30px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  font-family: Roboto Condensed, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
`;

const Word = styled.div`
  font-family: Roboto Condensed, serif;
`;

const Amount = styled.div`
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AddToCart = styled.button`
  background-color: #5ECE7B;
  border: none;
  color: white;
  padding: 15px;
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 40px;

  &:hover {
    background-color: #4fa866;
    cursor: pointer;
  }

  @media (max-width: 1250px) {
    margin-right: 10px;
  }
`;

const Description = styled.div`
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  margin-right: 10px;
`;

const fixProductName = (str: string) => str.slice(1).split('%20').join(' ');

interface FullProductInfoProps {
  data: MainPageQuery & QueryControls<MainPageQuery, {}>
}

class FullProductInfo extends Component<ChildDataProps<RouteComponentProps<{}> & FullProductInfoProps, MainPageQuery, {}>> {
  static contextType = CurrencyContext;

  state = { showOverlay: false, selectedAttributes: {} as any, mainPhoto: null };

  render() {
    const allProducts = this.props?.data?.category?.products;

    if (!allProducts) {
      return null;
    }

    const product = fixProductName(this.props.history.location.search);
    // @ts-ignore
    const productInfo: Product | null = allProducts.find((oneProduct) => oneProduct?.name === product);
    const photo = this.state.mainPhoto || productInfo?.gallery?.[0];

    const showOverlay = (state: boolean) => {
      this.setState({ showOverlay: state });
    };

    const price = getPrice(productInfo?.prices!, this.context.currency);

    return (
      <ShopCartContext.Consumer>
        {({ addProduct }) => (
          <MainDiv>
            <Header showOverlay={showOverlay} />
            <Container>
              {this.state.showOverlay && <Overlay />}
              <ProductInfo>
                <AllPhotos>
                  <Miniatures>
                    {
                      productInfo?.gallery?.map((minPhoto: string | null) => (
                        <div key={minPhoto}>
                          <Miniature src={minPhoto!} onClick={() => this.setState({ mainPhoto: minPhoto })} />
                        </div>
                      ))
                    }
                  </Miniatures>
                  <MainPhoto>
                    <div>
                      <Photo alt="main" src={photo!}/>
                    </div>
                  </MainPhoto>
                </AllPhotos>
                <Info>
                  <ProductName>{productInfo?.name}</ProductName>
                  {productInfo?.attributes?.map((attribute: any) => (
                    <Attribute
                      key={attribute!.id}
                      onAttributeSelect={(attributeItem) => {
                        this.setState({
                          selectedAttributes: {
                            ...this.state.selectedAttributes,
                            [attribute!.id]: attributeItem,
                          },
                        });
                      }}
                      selectedAttribute={this.state.selectedAttributes[attribute!.id]}
                      attribute={attribute!}
                    />
                  ))}
                  <Price>
                    <Word>PRICE:</Word>
                    <Amount>{`${this.context.currency} ${price?.toString()}`}</Amount>
                  </Price>
                  <AddToCart
                    onClick={() => {
                      addProduct(productInfo?.name!, this.state.selectedAttributes, productInfo?.attributes, productInfo?.prices, compact(productInfo?.gallery));
                    }}
                  >
                    ADD TO CART
                  </AddToCart>
                  <Description dangerouslySetInnerHTML={{__html: sanitize(productInfo?.description!)}}/>
                </Info>
              </ProductInfo>
            </Container>
          </MainDiv>
        )}
      </ShopCartContext.Consumer>
    );
  }
}

export default graphql<RouteComponentProps<{}> & FullProductInfoProps, MainPageQuery, {}, {}>(GET_ALL_INFO)(FullProductInfo);

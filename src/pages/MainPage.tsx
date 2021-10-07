import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { ChildDataProps, graphql, QueryControls } from '@apollo/client/react/hoc';
import ProductCard from '../components/ProductCart';
import Header from '../components/Header';
import { GET_ALL_INFO } from '../graphql/query';
import { MainPageQuery } from '../graphql/__generated__/MainPageQuery';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
`;

const CategoryAndProducts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryName = styled.div`
  font-family: Raleway, serif;
  line-height: 160%;
  font-size: 40px;
  margin-bottom: 100px;
  width: 100%;
  max-width: 1200px;
  padding: 15px;
  box-sizing: border-box;
`;

const ProductList = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;

  &::after {
    content: "";
    flex: auto;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
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

interface MatchParams {
  category: string;
}

interface MainPageProps extends RouteComponentProps<MatchParams> {
  data: MainPageQuery & QueryControls<MainPageQuery, {}>
}

class MainPage extends Component<ChildDataProps<MainPageProps, MainPageQuery, {}>> {
  state = { showOverlay: false };

  render() {
    const products = this.props?.data?.category?.products;
    const { category } = this.props.match.params;

    const showOverlay = (state: boolean) => {
      this.setState({ showOverlay: state });
    };

    let filteredProducts = products;

    if (category && category !== 'all') {
      filteredProducts = products?.filter((product) => product?.category === category);
    }

    return (
      <MainDiv>
        <Header showOverlay={showOverlay} category={category} />
        <Container>
          {this.state.showOverlay && <Overlay />}
          <CategoryAndProducts>
            <CategoryName>{category}</CategoryName>
            <ProductList>
              {filteredProducts?.map((product) => (
                <ProductCard key={product?.id} product={product!} />
              ))}
            </ProductList>
          </CategoryAndProducts>
        </Container>
      </MainDiv>
    );
  }
}

export default graphql<MainPageProps, MainPageQuery, {}, {}>(GET_ALL_INFO)(MainPage);

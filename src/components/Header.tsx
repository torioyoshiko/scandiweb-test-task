import React, {Component} from 'react';
import styled from 'styled-components';
import {ChildDataProps, graphql} from '@apollo/client/react/hoc';
import currencyToSymbolMap from 'currency-symbol-map'
import {ReactComponent as LogoImage} from '../images/logo.svg';
import {ReactComponent as ArrowDown} from '../images/arrow-down.svg';
import {ReactComponent as ArrowUp} from '../images/arrow-up.svg';
import {ReactComponent as ShopCart} from '../images/shop-cart.svg';
import {CurrencyContext} from '../context/currency.context';
import {ShopCartContext} from '../context/shopCart.context';
import ShopCardMini from './ShopCartMini';
import {MainPageQuery} from '../graphql/__generated__/MainPageQuery';
import {GET_ALL_INFO} from '../graphql/query';
import Name from './Name';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  font-family: Raleway, serif;
  padding: 15px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  height: 75px;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap
`;

const CurrencyAndShopCart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center
`;

const CurrencyOpen = styled.div`
  position: relative;
  height: 55px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Symbols = styled.div`
  padding-bottom: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CurrencyMenu = styled.div`
  margin: 25px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  box-shadow: 0 5px 35px rgba(168, 172, 176, 0.19);
  height: 170px;
  width: 115px;
  z-index: 2;
  background-color: white;
`;

const Currency = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 7px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const ArrowUpContainer = styled.div`
  margin: 0 7px 0 7px;
`;

const ShopCartContainer = styled.div`
  position: relative;
  height: 55px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  margin: 3px;
`;

const NumberOfProducts = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: -10px;
  right: -10px;
  background-color: black;
  border-radius: 10px;
  Width: 20px;
  Height: 20px;
  color: white;
  font-family: Roboto, sans-serif;
`;

const ShopCartOpen = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
`;

interface HeaderProps {
  showOverlay: (state: boolean) => void
  category?: string
}

class Header extends Component<ChildDataProps<HeaderProps, MainPageQuery, {}>> {
  currencyWrapperRef: React.RefObject<HTMLDivElement>;

  shopCardWrapperRef: React.RefObject<HTMLDivElement>;

  state = {currencySwitcherOpen: false, shopCardSwitchOpen: false};

  static contextType = CurrencyContext;

  constructor(props: any) {
    super(props);

    this.currencyWrapperRef = React.createRef();
    this.shopCardWrapperRef = React.createRef();
  }

  handleClickOutside = (event: any) => {
    if (!this.currencyWrapperRef.current?.contains(event.target)) {
      this.setState({currencySwitcherOpen: false});
    }

    if (!this.shopCardWrapperRef.current?.contains(event.target)) {
      this.setState({shopCardSwitchOpen: false});
      this.props.showOverlay(false);
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const currencies = this.context?.currencies;
    const products = this.props?.data?.category?.products;
    const categoriesNames: string[] = [];

    if (products) {
      categoriesNames.push('all');

      for (let i = 0; i < products.length; i++) {
        if (!categoriesNames.includes(products[i]?.category!)) {
          categoriesNames.push(products[i]?.category!);
        }
      }
    }

    return (
      <ShopCartContext.Consumer>
        {
          ({products}) => {
            return (
              <MainContainer>
                <Categories>
                  {categoriesNames.map(
                    (name) => (
                      <Name
                        nameOfCategory={name}
                        key={name}
                        currentlyChosen={name !== this.props.category}
                        to={`/${name}`}
                      />
                    ),
                  )}
                </Categories>
                <Logo><LogoImage/></Logo>
                <CurrencyAndShopCart>
                  <CurrencyOpen ref={this.currencyWrapperRef}>
                    <Symbols onClick={() => this.setState({currencySwitcherOpen: !this.state.currencySwitcherOpen})}>
                      {currencyToSymbolMap(this.context.currency)}
                      <ArrowUpContainer>
                        {!this.state.currencySwitcherOpen && <ArrowDown/>}
                        {this.state.currencySwitcherOpen && <ArrowUp/>}
                      </ArrowUpContainer>
                    </Symbols>
                    {this.state.currencySwitcherOpen
                    && (
                      <CurrencyMenu>
                        {currencies.map((currency: string) => (
                          <Currency
                            onClick={() => {
                              this.context.setCurrency(currency);
                              this.setState({currencySwitcherOpen: !this.state.currencySwitcherOpen});
                            }}
                            key={currency}
                          >
                            {currencyToSymbolMap(currency) + ' ' + currency}
                          </Currency>
                        ))}
                      </CurrencyMenu>
                    )}
                  </CurrencyOpen>
                  <ShopCartContainer>
                    <ShopCart
                      onClick={() => {
                        this.setState({shopCardSwitchOpen: !this.state.shopCardSwitchOpen});
                        this.props.showOverlay(!this.state.shopCardSwitchOpen);
                      }}
                    />
                    {products.length > 0 && <NumberOfProducts onClick={() => {
                      this.setState({shopCardSwitchOpen: !this.state.shopCardSwitchOpen});
                      this.props.showOverlay(!this.state.shopCardSwitchOpen);
                    }}>{products.length}</NumberOfProducts>}
                    <ShopCartOpen ref={this.shopCardWrapperRef}>
                      {this.state.shopCardSwitchOpen && <ShopCardMini/>}
                    </ShopCartOpen>
                  </ShopCartContainer>
                </CurrencyAndShopCart>
              </MainContainer>
            );
          }
        }
      </ShopCartContext.Consumer>
    );
  }
}

export default graphql<HeaderProps, MainPageQuery>(GET_ALL_INFO)(Header);

import React, { Component } from 'react';
import styled from 'styled-components';
import {ReactComponent as ArrowLeft} from "../images/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../images/arrow-right.svg";
import {values} from "lodash";
import {CurrencyContext} from "../context/currency.context";
import {ShopCartContext, ShopCartProduct} from '../context/shopCart.context';


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
  margin-left: 20px;
  position: relative;
`;

const ArrowsContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Arrow = styled.div`
  cursor: pointer;
`

const Miniature = styled.img`
  width: 141px;
  height: 185px;
  object-fit: contain;
  pointer-events: none;
`;

interface ProductInCartProps {
  product: ShopCartProduct

}

class ProductInCart extends Component<ProductInCartProps>{
  static contextType = CurrencyContext;
  state = { mainPhotoIndex: 0 };

  changePhoto = (button: string) => {
    if (button === 'right') {
      if (this.state.mainPhotoIndex + 1 < this.props.product.photo.length) {
          this.setState({mainPhotoIndex: this.state.mainPhotoIndex + 1})
        } else {
          this.setState({mainPhotoIndex: 0})
        }
      }

    if (button === 'left'){
      if (this.state.mainPhotoIndex - 1 < 0) {
        this.setState({mainPhotoIndex: this.props.product.photo.length-1})
      } else {
        this.setState({mainPhotoIndex: this.state.mainPhotoIndex - 1})
      }
    }
  }

  render() {
    return (
      <ShopCartContext.Consumer>
        {({ addProduct, removeProduct }) => (
          <Product key={this.props.product.id}>
            <Info>
              <Name>{this.props.product.id}</Name>
              <Price>{this.context.currency + this.props.product.price * this.props.product.quantity}</Price>
              <div>
                {values(this.props.product?.selectedAttributes).map((attribute) => (
                  <Attribute>{attribute}</Attribute>))}
              </div>
            </Info>
            <ButtonsAndPhoto>
              <ButtonBlock>
                <Button
                  onClick={() => addProduct(this.props.product.id, this.props.product.selectedAttributes, this.props.product.allAttributes, this.props.product.price, this.props.product.photo)}
                >
                  +
                </Button>
                <Quantity>{this.props.product?.quantity}</Quantity>
                <Button
                  onClick={() => removeProduct(this.props.product.id, this.props.product.selectedAttributes, this.props.product.allAttributes, this.props.product.price, this.props.product.photo)}
                >
                  -
                </Button>
              </ButtonBlock>
              <PhotoBlock>
                <ArrowsContainer>
                  <Arrow onClick={()=> this.changePhoto('left')}>
                    <ArrowLeft />
                  </Arrow>
                  <Arrow onClick={()=> this.changePhoto('right')}>
                    <ArrowRight />
                  </Arrow>
                </ArrowsContainer>
                <Miniature src={this.props.product.photo[this.state.mainPhotoIndex]} />
              </PhotoBlock>
            </ButtonsAndPhoto>
          </Product>
        )}
      </ShopCartContext.Consumer>
    );
  }
}

export default ProductInCart;

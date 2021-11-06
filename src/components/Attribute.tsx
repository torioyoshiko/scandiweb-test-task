import React, { Component } from 'react';
import styled from 'styled-components';
import {
  MainPageQuery_category_products_attributes as MainPageQueryCategoryProductsAttributes,
} from '../graphql/__generated__/MainPageQuery';

const AttributeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AttributeNameContainer = styled.div`
  padding-top: 40px;
  padding-bottom: 7px;
  font-family: Roboto Condensed, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
`;

const VariantsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const OneVariant = styled.div<{ selected: boolean }>`
  margin-right: 12px;
  padding: 15px 20px;
  border: 1px solid #1D1F22;
  margin-top: 10px;

  &:hover {
    color: white;
    background-color: black;
    cursor: pointer;
  }

  ${({ selected }) => selected && `
    color: white;
    background-color: black;
    cursor: pointer;
  `}
`;

const OneVariantWithColor = styled.div<{ selected: boolean, backColor: string }>`
  margin-right: 12px;
  padding: 15px 20px;
  border: 1px solid #1D1F22;
  margin-top: 10px;
  width: 20px;
  height: 20px;

  &:hover {
    color: white;
    background-color: black;
    cursor: pointer;
  }

  ${({backColor}) => `
  background-color: ${backColor}
  `}

  ${({ selected }) => selected && `
    color: white;
    background-color: black;
    cursor: pointer;
  `}
  
`;

interface AttributeProps {
  attribute: MainPageQueryCategoryProductsAttributes;
  onAttributeSelect: (attributeItem: string) => void;
  selectedAttribute: string | null;
}

export class Attribute extends Component<AttributeProps> {
  render() {
    const attributeName = this.props?.attribute?.id;

    return (
      <AttributeContainer>
        <AttributeNameContainer>
          {`${attributeName?.toUpperCase()}:`}
        </AttributeNameContainer>
        <VariantsContainer>
          {this.props.attribute.type === 'swatch' && this.props?.attribute?.items?.map(
            (variant) => (
              <OneVariantWithColor
                key={variant?.id}
                selected={this.props.selectedAttribute === variant?.id}
                backColor={variant?.value!}
                onClick={() => this.props.onAttributeSelect(variant!.id)}
              />
            ),
          )}

          {this.props.attribute.type !== 'swatch' && this.props?.attribute?.items?.map(
            (variant) => (
              <OneVariant
                key={variant?.id}
                selected={this.props.selectedAttribute === variant?.id}
                onClick={() => this.props.onAttributeSelect(variant!.id)}
              >
                {variant?.displayValue}
              </OneVariant>
            ),
          )}
        </VariantsContainer>
      </AttributeContainer>
    );
  }
}

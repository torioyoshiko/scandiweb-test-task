/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainPageQuery
// ====================================================

export interface MainPageQuery_category_products_prices {
  __typename: "Price";
  amount: number;
  currency: string;
}

export interface MainPageQuery_category_products_attributes_items {
  __typename: "Attribute";
  displayValue: string | null;
  id: string;
  value: string | null;
}

export interface MainPageQuery_category_products_attributes {
  __typename: "AttributeSet";
  id: string;
  items: (MainPageQuery_category_products_attributes_items | null)[] | null;
  name: string | null;
  type: string | null;
}

export interface MainPageQuery_category_products {
  __typename: "Product";
  id: string;
  name: string;
  gallery: (string | null)[] | null;
  category: string;
  description: string;
  prices: MainPageQuery_category_products_prices[];
  inStock: boolean | null;
  attributes: (MainPageQuery_category_products_attributes | null)[] | null;
}

export interface MainPageQuery_category {
  __typename: "Category";
  name: string | null;
  products: (MainPageQuery_category_products | null)[];
}

export interface MainPageQuery {
  category: MainPageQuery_category | null;
  currencies: (string | null)[] | null;
}

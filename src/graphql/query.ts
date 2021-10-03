import { gql } from '@apollo/client';

export const GET_ALL_INFO = gql`
    query MainPageQuery {
        category {
            name
            products {
                id
                name
                gallery
                category
                description
                prices{
                    amount
                    currency
                }
                inStock
                attributes {
                    id
                    items {
                        displayValue
                        id
                        value
                    }
                    name
                    type
                }
            }
        }
        currencies
    }
`;

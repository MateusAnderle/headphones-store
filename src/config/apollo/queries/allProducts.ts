import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query {
    products {
      data {
        id
        attributes {
          title
          description
          brand
          model
          quantity
          price
          images {
            data {
              id
              attributes {
                name
                url
                size
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

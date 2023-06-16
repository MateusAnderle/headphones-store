import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query {
    products {
      data {
        id
        attributes {
          model
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

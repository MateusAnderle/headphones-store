import { gql } from '@apollo/client';

export const PRODUCT_DETAIL = gql`
  query ($id: ID!) {
    product(id: $id) {
      data {
        id
        attributes {
          title
          description
          quantity
          price
          images {
            data {
              id
              attributes {
                url
              }
            }
          }
          brand
          model
          createdAt
          updatedAt
        }
      }
    }
  }
`;

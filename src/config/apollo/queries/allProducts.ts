import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query ($filter: StringFilterInput) {
    products(filters: { title: $filter }) {
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

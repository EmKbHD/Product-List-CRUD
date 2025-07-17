import { gql } from "@apollo/client";

export const FETCH_ALL_PRODUCTS = gql`
  query getProducts {
    products {
      title
      price
      quantity
      image
      description
    }
  }
`;

export const FETCH_ONE_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
      title
      price
      quantity
      image
      description
    }
  }
`;

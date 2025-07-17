import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($input: AddProduct!) {
    addProduct(input: $input) {
      title
      price
      quantity
      image
      description
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation EditProduct($id: ID!, $input: EditProduct!) {
    editProduct(id: $id, input: $input) {
      title
      price
      quantity
      description
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      title
    }
  }
`;

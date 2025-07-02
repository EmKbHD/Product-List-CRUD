import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation logIn($input: LogInInput!) {
    logIn(input: $input) {
      user {
        firstName
        lastName
        email
      }
      token
    }
  }
`;

//SIGN UP MUTATION
export const SIGNUP_USER = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        firstName
        lastName
        email
      }
      token
    }
  }
`;

import { gql } from '@/__generated__';

export const REGISTER_USER = gql(`
  mutation Register($input: RegisterUserInput!) {
    register(input: $input) {
      id
      name
    }
  }
`);

export const VERIFY_EMAIL = gql(`
  mutation VerifyUser($access_token: String!) {
    verifyUser(access_token: $access_token) {
      status
      message
    }
  }
`)

export const LOGIN_USER = gql(`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
      token_type
    }
  }
`);
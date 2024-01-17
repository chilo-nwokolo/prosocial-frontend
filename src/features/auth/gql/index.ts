import { gql } from "@/__generated__";

export const QUERY_UNIVERSITY_GROUPS = gql(`
  query QUERY_UNIVERSITY_GROUPS{
    universities {
      id
      name
    }
  }
`);

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
`);

export const LOGIN_USER = gql(`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        phone
        email
        user_type
      }
    }
  }
`);

export const RESET_PASSWORD_LINK = gql(`
  mutation ResetPasswordLink($email: String!) {
    requestResetPasswordLink(email: $email) {
      status
      message
    }
  }`);

export const RESET_PASSWORD = gql(`
  mutation ResetPassword($token: String!, $new_password: String!) {
    requestResetPassword(token:$token, new_password:$new_password) {
      status
      message
    }
  }
`);

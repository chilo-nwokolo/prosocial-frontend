import { gql } from '@/__generated__';

export const ME_QUERY = gql(`
  query ME {
    me {
      __typename
      id
      unique_id
      name
      email
      phone
      profile {
        avatar
      }
    }
  }
`);

export const UPDATE_USER_INFO = gql(`
  mutation UPDATE_USER_INFO($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  } 
`);

import { gql } from '@/__generated__';

export const ME_QUERY = gql(`
  query ME {
    me {
      id
      name
    }
  }
`);

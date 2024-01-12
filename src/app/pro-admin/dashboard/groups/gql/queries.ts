import { gql } from "@/__generated__";

export const QUERY_GROUPS = gql(`
  query QUERY_GROUPS {
    groups {
      id
      name
      outing_date
      note
      users {
        id
        name
        email
      }
    }
  }
`);

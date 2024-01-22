import { gql } from "@/__generated__";

export const QUERY_GROUPS = gql(`
  query QUERY_GROUPS {
    groups {
      id
      name
      outing_date
      note
      feedback_received
      group_invite_status
      created_at
      users {
        id
        name
        email
      }
    }
  }
`);

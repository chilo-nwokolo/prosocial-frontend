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

export const SEND_GROUP_INVITATION = gql(`
  mutation SendGroupInviteToParticipants($group_id: ID!){
    sendGroupInviteToParticipants(group_id: $group_id) {
      status
      message
    }  
  }
`);

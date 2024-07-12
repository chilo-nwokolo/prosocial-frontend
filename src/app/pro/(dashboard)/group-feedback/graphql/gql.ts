import { gql } from "@/__generated__";

export const PULL_USER_GROUP = gql(`
  query PULL_USER_GROUP($user_unique_id: String!, $group_id: ID!){
    pullUserGroupParticipants(user_unique_id: $user_unique_id, group_id: $group_id) {
      id
      name
      users {
        id
        name
        unique_id
        profile {
          avatar
        }
      }
    }
  }
`);

export const MUTATION_SUBMIT_FEEDBACK = gql(`
  mutation MUTATION_SUBMIT_FEEDBACK($input: OutingFeedbackInput!) {
    submitFeedback(input: $input) {
      status
      message
    }
  }
`);

import { gql } from "@/__generated__";

export const SUBMIT_SOCIAL_PREFERENCES = gql(`
  mutation SUBMIT_SOCIAL_PREFERENCES($input: HandleSocialPreferenceSubmitInput!) {
    handleSocialPreferenceSubmit(input: $input) {
      status
      message
    }
  }
`);

export const QUERY_USER_SOCIAL_PREFERENCE = gql(`
  query QUERY_USER_SOCIAL_PREFERENCE($id: ID) {
    user(id: $id) {
      id
      name
      social_preference_answers {
        id
        answer
        social_preference_option {
          id
          title
          social_preference {
            id
            title
          }
        }
        meta {
          key
          value
        }
      }
    }
  }
`);

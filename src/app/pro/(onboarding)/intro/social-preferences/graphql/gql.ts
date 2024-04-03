import { gql } from "@/__generated__";

export const SUBMIT_SOCIAL_PREFERENCES = gql(`
  mutation SUBMIT_SOCIAL_PREFERENCES($input: HandleSocialPreferenceSubmitInput!) {
    handleSocialPreferenceSubmit(input: $input) {
      status
      message
    }
  }
`);

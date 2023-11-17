import { gql } from "@/__generated__";

export const ALL_QUESTIONS = gql(`
  query Questions {
    questionCategories {
      id
      questions {
        id
        text
        sub_category
        options {
          id
          title
          value
        }
      }
    }
  }
`);

export const INTERESTS_BY_TRAITS = gql(`
  query INTERESTS_BY_TRAITS {
    interestsByTrait {
      id
      title
      interests {
        id
        title
        image_url
      }
    }
  }
`)

export const INTERESTS_BY_NONE_TRAITS = gql(`
  query INTERESTS_BY_NONE_TRAITS {
    interestsByNoneTrait {
      id
      title
      image_url
      interests {
        id
        title
        image_url
      }
    }
  }
`)


/**
 * 
 * MUTATIONS
 */

export const SUBMIT_USER_INTERESTS = gql(`
  mutation SUBMIT_USER_INTERESTS ($input: UserInterestInputs!) {
    submitUserInterest(input: $input) {
      status
      message
    }
  }
`)
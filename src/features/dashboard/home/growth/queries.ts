import { gql } from "@/__generated__";

export const QUERY_ALL_QUESTIONS = gql(`
  query QUERY_ALL_QUESTIONS {
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

export const QUERY_INTERESTS_BY_TRAITS = gql(`
  query QUERY_INTERESTS_BY_TRAITS {
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

export const QUERY_INTERESTS_BY_NONE_TRAITS = gql(`
  query QUERY_INTERESTS_BY_NONE_TRAITS {
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

export const QUERY_ME_JOURNALS = gql(`
  query QUERY_ME_JOURNALS {
    me {
      journals {
        id
        input
        category {
          id
        }
      }
    }
  }
`);

export const QUERY_ME_INTERESTS = gql(`
  query QUERY_ME_INTERESTS {
    me {
      id
      interests {
        id
        title
      }
    }
  }
`);

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

export const CREATE_JOURNAL_ENTRY = gql(`
  mutation CREATE_JOURNAL_ENTRY ($input: String!, $journal_category_id: ID!) {
    mutateJournal(input: $input, journal_category_id: $journal_category_id) {
      id
      category {
        id
      }
    }
  }
`)
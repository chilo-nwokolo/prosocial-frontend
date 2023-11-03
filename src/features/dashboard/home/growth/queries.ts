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
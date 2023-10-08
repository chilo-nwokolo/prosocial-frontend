import { gql } from "@/__generated__";

export const QUERY_QUESTIONS = gql(`
  query QuestionsCategory {
    questionCategories {
      id
      name
      questions {
        id
        text
        type
        options {
          id
          title
          value
        }
      }
    }
  }
`);

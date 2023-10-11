import { gql } from "@/__generated__";

/**
 * 
 * QUERIES
 */
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

/**
 * 
 * MUTATIONS
 */

export const SURVEY_RESPONSE = gql(`
  mutation QuestionResponse($input: QuestionResponseGroupInput!) {
    questionResponse(input: $input) {
      status
      message
    }
  }
`);

export const UPDATE_USER_PROFILE = gql(`
  mutation UPDATE_USER_PROFILE($input: UpdateUserInput!) {
    updateUser(input: $input) {
      profile {
        id
        gender
        race
        relationship_status
        level_of_education
        zip_code
        political_orientation
        socialization
        to_socialization
        health_rating
      }
    }
  }
`)
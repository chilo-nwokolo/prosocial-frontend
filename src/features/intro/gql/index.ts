import { gql } from '@/__generated__';

/**
 *
 * QUERIES
 */
export const QUERY_QUESTIONS = gql(`
  query OnBoardCategoriesWithQuestions {
    onBoardCategoriesWithQuestions {
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

export const ME_PERSONALITY_SCORE = gql(`
  query MePersonalityScore {
    me {
      personalityScore {
        id
        personalityBucketType {
          id
          name
          sub_title
          description
          bucketQuestions {
            id
            title
            text
          }
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

export const USER_BUCKET_QUESTIONS_RESPONSE_INPUT = gql(`
  mutation SubmitPersonalityBucketQuestion($input: [UserBucketQuestionResponseInput!]) {
    submitPersonalityBucketQuestion(input: $input) {
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
`);

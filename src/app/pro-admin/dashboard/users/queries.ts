import { gql } from "@/__generated__";

export const QUERY_ADMIN_USERS = gql(`
  query QUERY_ADMIN_USERS($input: adminQueryUsersInput) {
    adminQueryUsers(input: $input) {
      id
      name
      unique_id
      email
      dob
      personalityScore {
        id
        extroversion
        agreeableness
        conscientiousness
        neuroticism
        openness
        narcissism
        personalityBucketType {
          id
          name
          sub_title
        }
      }
      profile {
        political_orientation
        level_of_education
        gender
        race
        relationship_status
        health_rating
      }
    }
  }
`);

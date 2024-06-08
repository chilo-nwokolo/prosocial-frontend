import { gql } from "@/__generated__";

export const QUERY_ADMIN_USERS = gql(`
  query QUERY_ADMIN_USERS($input: adminQueryUsersInput) {
    adminQueryUsers(input: $input) {
      id
      name
      unique_id
      email
      phone
      dob
      groups {
        id
        name
      }
      social_preference_answers {
        id
        answer
        description
        note
        social_preference_option {
          id
          title
          social_preference {
            id
            title
          }
        }
      }
      interests {
        id
        title
      }
      question_responses {
        id
      }
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
        zip_code
        has_children
        occupation
        family_size_in_numbers
        type_of_city_grown
        avatar
      }
    }
  }
`);

// MUTATIONS
export const CREATE_GROUP_MUTATION = gql(`
  mutation CREATE_GROUP_MUTATION($input: UserGroupInput!) {
    createGroup(input:$input) {
      id
    }
  }
`);

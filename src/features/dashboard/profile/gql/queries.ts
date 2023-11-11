import { gql } from '@/__generated__';

export const ME_QUERY = gql(`
  query ME {
    me {
      __typename
      id
      unique_id
      name
      email
      phone
      profile {
        avatar
      }
    }
  }
`);

export const ME_QUESTION_RESPONSES = gql(`
  query ME_QUESTION_RESPONSES {
    me {
      id
      question_responses {
        id
        question {
          id
        }
        answer {
          id
          value
        }
      }
    }
  }
`);

export const ME_SCHEDULES = gql(`
  query ME_SCHEDULES {
    me {
      schedules {
        id
        day_name
        time_range
        status
      }
    }
  }
`);

export const UPDATE_USER_INFO = gql(`
  mutation UPDATE_USER_INFO($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`);

export const UPDATE_PROFILE_PICTURE = gql(`
  mutation UPDATE_PROFILE_PICTURE($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`);

export const UPDATE_USER_SCHEDULE = gql(`
  mutation UpdateUserSchedule($input: SchedulesInput!) {
    updateUserSchedules(input: $input) {
      id
    }
  }
`);

import { gql } from "@/__generated__";

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
      groups {
        id
        name
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
        day_name
        time_range
        status
      }
    }
  }
`);

export const QUERY_ME_SETTINGS = gql(`
  query QUERY_ME_SETTINGS {
    me {
      settings {
        preference_settings {
          key
          value 
        }
      }
    }
  }
`);

/**
 * MUTATIONS
 */

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

export const UPDATE_USER_SETTINGS = gql(`
  mutation UPDATE_USER_SETTINGS($input: UserSettingInput!) {
    updateUserSettings(input: $input) {
      id
      settings {
        preference_settings {
          key
          value
        }
      }
    }
  }
`);

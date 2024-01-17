/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query QUERY_GROUPS {\n    groups {\n      id\n      name\n      outing_date\n      note\n      users {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.Query_GroupsDocument,
    "\n  query QUERY_ADMIN_USERS($input: adminQueryUsersInput) {\n    adminQueryUsers(input: $input) {\n      id\n      name\n      unique_id\n      email\n      phone\n      dob\n      question_responses {\n        id\n      }\n      personalityScore {\n        id\n        extroversion\n        agreeableness\n        conscientiousness\n        neuroticism\n        openness\n        narcissism\n        personalityBucketType {\n          id\n          name\n          sub_title\n        }\n      }\n      profile {\n        political_orientation\n        level_of_education\n        gender\n        race\n        relationship_status\n        health_rating\n      }\n    }\n  }\n": types.Query_Admin_UsersDocument,
    "\n  mutation CREATE_GROUP_MUTATION($input: UserGroupInput!) {\n    createGroup(input:$input) {\n      id\n    }\n  }\n": types.Create_Group_MutationDocument,
    "\n  query QUERY_UNIVERSITY_GROUPS{\n    universities {\n      id\n      name\n    }\n  }\n": types.Query_University_GroupsDocument,
    "\n  mutation Register($input: RegisterUserInput!) {\n    register(input: $input) {\n      id\n      name\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation VerifyUser($access_token: String!) {\n    verifyUser(access_token: $access_token) {\n      status\n      message\n    }\n  }\n": types.VerifyUserDocument,
    "\n  mutation LOGIN_USER($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        phone\n        email\n        user_type\n      }\n    }\n  }\n": types.Login_UserDocument,
    "\n  mutation ResetPasswordLink($email: String!) {\n    requestResetPasswordLink(email: $email) {\n      status\n      message\n    }\n  }": types.ResetPasswordLinkDocument,
    "\n  mutation ResetPassword($token: String!, $new_password: String!) {\n    requestResetPassword(token:$token, new_password:$new_password) {\n      status\n      message\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  query QUERY_ALL_QUESTIONS {\n    questionCategories {\n      id\n      questions {\n        id\n        text\n        sub_category\n        options {\n          id\n          title\n          value\n        }\n      }\n    }\n  }\n": types.Query_All_QuestionsDocument,
    "\n  query QUERY_INTERESTS_BY_TRAITS {\n    interestsByTrait {\n      id\n      title\n      interests {\n        id\n        title\n        image_url\n      }\n    }\n  }\n": types.Query_Interests_By_TraitsDocument,
    "\n  query QUERY_INTERESTS_BY_NONE_TRAITS {\n    interestsByNoneTrait {\n      id\n      title\n      image_url\n      interests {\n        id\n        title\n        image_url\n      }\n    }\n  }\n": types.Query_Interests_By_None_TraitsDocument,
    "\n  query QUERY_ME_JOURNALS {\n    me {\n      journals {\n        id\n        input\n        category {\n          id\n        }\n      }\n    }\n  }\n": types.Query_Me_JournalsDocument,
    "\n  query QUERY_ME_INTERESTS {\n    me {\n      id\n      interests {\n        id\n        title\n      }\n    }\n  }\n": types.Query_Me_InterestsDocument,
    "\n  query QUERY_CHALLENGE_CATEGORIES {\n    challengeCategories {\n      id\n      title\n      type\n      video_url\n      transcript\n    }\n  }\n": types.Query_Challenge_CategoriesDocument,
    "\n  query QUERY_JOURNAL_CATEGORIES {\n    journalCategories {\n      id\n      title\n      type \n      journals {\n        id\n        input\n      }\n    }\n  }\n": types.Query_Journal_CategoriesDocument,
    "\n  query QUERY_ME_CHALLENGE_CATEGORIES {\n    me {\n      challenges {\n        id\n        input\n        category {\n          id\n          title\n        }\n      }\n    }\n  }\n": types.Query_Me_Challenge_CategoriesDocument,
    "\n  query QUERY_ME_PERSONALITY_TYPE {\n    me {\n      personalityScore {\n        id\n        personalityBucketType {\n          id\n          name\n          sub_title\n        }\n      }\n    }\n  }\n": types.Query_Me_Personality_TypeDocument,
    "\n  mutation SUBMIT_USER_INTERESTS ($input: UserInterestInputs!) {\n    submitUserInterest(input: $input) {\n      status\n      message\n    }\n  }\n": types.Submit_User_InterestsDocument,
    "\n  mutation CREATE_JOURNAL_ENTRY ($input: String!, $journal_category_id: ID!) {\n    mutateJournal(input: $input, journal_category_id: $journal_category_id) {\n      id\n      category {\n        id\n      }\n    }\n  }\n": types.Create_Journal_EntryDocument,
    "\n  query ME {\n    me {\n      __typename\n      id\n      unique_id\n      name\n      email\n      phone\n      profile {\n        avatar\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query ME_QUESTION_RESPONSES {\n    me {\n      id\n      question_responses {\n        id\n        question {\n          id\n        }\n        answer {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.Me_Question_ResponsesDocument,
    "\n  query ME_SCHEDULES {\n    me {\n      schedules {\n        day_name\n        time_range\n        status\n      }\n    }\n  }\n": types.Me_SchedulesDocument,
    "\n  query QUERY_ME_SETTINGS {\n    me {\n      settings {\n        preference_settings {\n          key\n          value \n        }\n      }\n    }\n  }\n": types.Query_Me_SettingsDocument,
    "\n  mutation UPDATE_USER_INFO($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n    }\n  }\n": types.Update_User_InfoDocument,
    "\n  mutation UPDATE_PROFILE_PICTURE($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n    }\n  }\n": types.Update_Profile_PictureDocument,
    "\n  mutation UpdateUserSchedule($input: SchedulesInput!) {\n    updateUserSchedules(input: $input) {\n      id\n    }\n  }\n": types.UpdateUserScheduleDocument,
    "\n  mutation UPDATE_USER_SETTINGS($input: UserSettingInput!) {\n    updateUserSettings(input: $input) {\n      id\n      settings {\n        preference_settings {\n          key\n          value\n        }\n      }\n    }\n  }\n": types.Update_User_SettingsDocument,
    "\n  query OnBoardCategoriesWithQuestions {\n    onBoardCategoriesWithQuestions {\n      id\n      name\n      questions {\n        id\n        text\n        type\n        options {\n          id\n          title\n          value\n        }\n      }\n    }\n  }\n": types.OnBoardCategoriesWithQuestionsDocument,
    "\n  query MePersonalityScore {\n    me {\n      personalityScore {\n        id\n        personalityBucketType {\n          id\n          name\n          sub_title\n          image\n          description\n          bucketQuestions {\n            id\n            title\n            text\n          }\n        }\n      }\n    }\n  }\n": types.MePersonalityScoreDocument,
    "\n  mutation QuestionResponse($input: QuestionResponseGroupInput!) {\n    questionResponse(input: $input) {\n      status\n      message\n    }\n  }\n": types.QuestionResponseDocument,
    "\n  mutation SubmitPersonalityBucketQuestion($input: [UserBucketQuestionResponseInput!]) {\n    submitPersonalityBucketQuestion(input: $input) {\n      status\n      message\n    }\n  }\n": types.SubmitPersonalityBucketQuestionDocument,
    "\n  mutation UPDATE_USER_PROFILE($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      profile {\n        id\n        gender\n        race\n        relationship_status\n        level_of_education\n        zip_code\n        political_orientation\n        socialization\n        to_socialization\n        health_rating\n      }\n    }\n  }\n": types.Update_User_ProfileDocument,
    "\n\tquery QUERY_USERS {\n\t\tusers {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.Query_UsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_GROUPS {\n    groups {\n      id\n      name\n      outing_date\n      note\n      users {\n        id\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_GROUPS {\n    groups {\n      id\n      name\n      outing_date\n      note\n      users {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_ADMIN_USERS($input: adminQueryUsersInput) {\n    adminQueryUsers(input: $input) {\n      id\n      name\n      unique_id\n      email\n      phone\n      dob\n      question_responses {\n        id\n      }\n      personalityScore {\n        id\n        extroversion\n        agreeableness\n        conscientiousness\n        neuroticism\n        openness\n        narcissism\n        personalityBucketType {\n          id\n          name\n          sub_title\n        }\n      }\n      profile {\n        political_orientation\n        level_of_education\n        gender\n        race\n        relationship_status\n        health_rating\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_ADMIN_USERS($input: adminQueryUsersInput) {\n    adminQueryUsers(input: $input) {\n      id\n      name\n      unique_id\n      email\n      phone\n      dob\n      question_responses {\n        id\n      }\n      personalityScore {\n        id\n        extroversion\n        agreeableness\n        conscientiousness\n        neuroticism\n        openness\n        narcissism\n        personalityBucketType {\n          id\n          name\n          sub_title\n        }\n      }\n      profile {\n        political_orientation\n        level_of_education\n        gender\n        race\n        relationship_status\n        health_rating\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CREATE_GROUP_MUTATION($input: UserGroupInput!) {\n    createGroup(input:$input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CREATE_GROUP_MUTATION($input: UserGroupInput!) {\n    createGroup(input:$input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_UNIVERSITY_GROUPS{\n    universities {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query QUERY_UNIVERSITY_GROUPS{\n    universities {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($input: RegisterUserInput!) {\n    register(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterUserInput!) {\n    register(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyUser($access_token: String!) {\n    verifyUser(access_token: $access_token) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyUser($access_token: String!) {\n    verifyUser(access_token: $access_token) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LOGIN_USER($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        phone\n        email\n        user_type\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LOGIN_USER($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        phone\n        email\n        user_type\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPasswordLink($email: String!) {\n    requestResetPasswordLink(email: $email) {\n      status\n      message\n    }\n  }"): (typeof documents)["\n  mutation ResetPasswordLink($email: String!) {\n    requestResetPasswordLink(email: $email) {\n      status\n      message\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPassword($token: String!, $new_password: String!) {\n    requestResetPassword(token:$token, new_password:$new_password) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($token: String!, $new_password: String!) {\n    requestResetPassword(token:$token, new_password:$new_password) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_ALL_QUESTIONS {\n    questionCategories {\n      id\n      questions {\n        id\n        text\n        sub_category\n        options {\n          id\n          title\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_ALL_QUESTIONS {\n    questionCategories {\n      id\n      questions {\n        id\n        text\n        sub_category\n        options {\n          id\n          title\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_INTERESTS_BY_TRAITS {\n    interestsByTrait {\n      id\n      title\n      interests {\n        id\n        title\n        image_url\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_INTERESTS_BY_TRAITS {\n    interestsByTrait {\n      id\n      title\n      interests {\n        id\n        title\n        image_url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_INTERESTS_BY_NONE_TRAITS {\n    interestsByNoneTrait {\n      id\n      title\n      image_url\n      interests {\n        id\n        title\n        image_url\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_INTERESTS_BY_NONE_TRAITS {\n    interestsByNoneTrait {\n      id\n      title\n      image_url\n      interests {\n        id\n        title\n        image_url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_ME_JOURNALS {\n    me {\n      journals {\n        id\n        input\n        category {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_ME_JOURNALS {\n    me {\n      journals {\n        id\n        input\n        category {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_ME_INTERESTS {\n    me {\n      id\n      interests {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_ME_INTERESTS {\n    me {\n      id\n      interests {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_CHALLENGE_CATEGORIES {\n    challengeCategories {\n      id\n      title\n      type\n      video_url\n      transcript\n    }\n  }\n"): (typeof documents)["\n  query QUERY_CHALLENGE_CATEGORIES {\n    challengeCategories {\n      id\n      title\n      type\n      video_url\n      transcript\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_JOURNAL_CATEGORIES {\n    journalCategories {\n      id\n      title\n      type \n      journals {\n        id\n        input\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_JOURNAL_CATEGORIES {\n    journalCategories {\n      id\n      title\n      type \n      journals {\n        id\n        input\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_ME_CHALLENGE_CATEGORIES {\n    me {\n      challenges {\n        id\n        input\n        category {\n          id\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_ME_CHALLENGE_CATEGORIES {\n    me {\n      challenges {\n        id\n        input\n        category {\n          id\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_ME_PERSONALITY_TYPE {\n    me {\n      personalityScore {\n        id\n        personalityBucketType {\n          id\n          name\n          sub_title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_ME_PERSONALITY_TYPE {\n    me {\n      personalityScore {\n        id\n        personalityBucketType {\n          id\n          name\n          sub_title\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SUBMIT_USER_INTERESTS ($input: UserInterestInputs!) {\n    submitUserInterest(input: $input) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation SUBMIT_USER_INTERESTS ($input: UserInterestInputs!) {\n    submitUserInterest(input: $input) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CREATE_JOURNAL_ENTRY ($input: String!, $journal_category_id: ID!) {\n    mutateJournal(input: $input, journal_category_id: $journal_category_id) {\n      id\n      category {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CREATE_JOURNAL_ENTRY ($input: String!, $journal_category_id: ID!) {\n    mutateJournal(input: $input, journal_category_id: $journal_category_id) {\n      id\n      category {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ME {\n    me {\n      __typename\n      id\n      unique_id\n      name\n      email\n      phone\n      profile {\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query ME {\n    me {\n      __typename\n      id\n      unique_id\n      name\n      email\n      phone\n      profile {\n        avatar\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ME_QUESTION_RESPONSES {\n    me {\n      id\n      question_responses {\n        id\n        question {\n          id\n        }\n        answer {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ME_QUESTION_RESPONSES {\n    me {\n      id\n      question_responses {\n        id\n        question {\n          id\n        }\n        answer {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ME_SCHEDULES {\n    me {\n      schedules {\n        day_name\n        time_range\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query ME_SCHEDULES {\n    me {\n      schedules {\n        day_name\n        time_range\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QUERY_ME_SETTINGS {\n    me {\n      settings {\n        preference_settings {\n          key\n          value \n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query QUERY_ME_SETTINGS {\n    me {\n      settings {\n        preference_settings {\n          key\n          value \n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UPDATE_USER_INFO($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UPDATE_USER_INFO($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UPDATE_PROFILE_PICTURE($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UPDATE_PROFILE_PICTURE($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserSchedule($input: SchedulesInput!) {\n    updateUserSchedules(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserSchedule($input: SchedulesInput!) {\n    updateUserSchedules(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UPDATE_USER_SETTINGS($input: UserSettingInput!) {\n    updateUserSettings(input: $input) {\n      id\n      settings {\n        preference_settings {\n          key\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UPDATE_USER_SETTINGS($input: UserSettingInput!) {\n    updateUserSettings(input: $input) {\n      id\n      settings {\n        preference_settings {\n          key\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query OnBoardCategoriesWithQuestions {\n    onBoardCategoriesWithQuestions {\n      id\n      name\n      questions {\n        id\n        text\n        type\n        options {\n          id\n          title\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query OnBoardCategoriesWithQuestions {\n    onBoardCategoriesWithQuestions {\n      id\n      name\n      questions {\n        id\n        text\n        type\n        options {\n          id\n          title\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MePersonalityScore {\n    me {\n      personalityScore {\n        id\n        personalityBucketType {\n          id\n          name\n          sub_title\n          image\n          description\n          bucketQuestions {\n            id\n            title\n            text\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MePersonalityScore {\n    me {\n      personalityScore {\n        id\n        personalityBucketType {\n          id\n          name\n          sub_title\n          image\n          description\n          bucketQuestions {\n            id\n            title\n            text\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation QuestionResponse($input: QuestionResponseGroupInput!) {\n    questionResponse(input: $input) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation QuestionResponse($input: QuestionResponseGroupInput!) {\n    questionResponse(input: $input) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SubmitPersonalityBucketQuestion($input: [UserBucketQuestionResponseInput!]) {\n    submitPersonalityBucketQuestion(input: $input) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation SubmitPersonalityBucketQuestion($input: [UserBucketQuestionResponseInput!]) {\n    submitPersonalityBucketQuestion(input: $input) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UPDATE_USER_PROFILE($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      profile {\n        id\n        gender\n        race\n        relationship_status\n        level_of_education\n        zip_code\n        political_orientation\n        socialization\n        to_socialization\n        health_rating\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UPDATE_USER_PROFILE($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      profile {\n        id\n        gender\n        race\n        relationship_status\n        level_of_education\n        zip_code\n        political_orientation\n        socialization\n        to_socialization\n        health_rating\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery QUERY_USERS {\n\t\tusers {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QUERY_USERS {\n\t\tusers {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
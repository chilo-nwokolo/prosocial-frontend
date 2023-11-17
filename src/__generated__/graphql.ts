/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export enum AnswerTypeEnum {
  RatingScale = 'RATING_SCALE',
  SingleChoice = 'SINGLE_CHOICE'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  token_type: Scalars['String']['output'];
  user: User;
};

export type BasicResponse = {
  __typename?: 'BasicResponse';
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type BucketQuestion = {
  __typename?: 'BucketQuestion';
  id: Scalars['ID']['output'];
  personalityBucket?: Maybe<PersonalityBucketType>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum DayName {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum GenderEnum {
  Female = 'FEMALE',
  Male = 'MALE',
  Nonconforming = 'NONCONFORMING',
  Other = 'OTHER',
  Prefernotoanswer = 'PREFERNOTOANSWER',
  Transgender = 'TRANSGENDER'
}

export type Interest = {
  __typename?: 'Interest';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  interestCategory?: Maybe<Interest>;
  interests?: Maybe<Array<Interest>>;
  is_organized_by_trait?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  logout?: Maybe<BasicResponse>;
  questionResponse: BasicResponse;
  register: User;
  requestResetPassword: BasicResponse;
  requestResetPasswordLink: BasicResponse;
  submitPersonalityBucketQuestion: BasicResponse;
  submitUserInterest?: Maybe<BasicResponse>;
  updateUser: User;
  updateUserSchedules?: Maybe<Array<Schedule>>;
  verifyUser: BasicResponse;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationQuestionResponseArgs = {
  input: QuestionResponseGroupInput;
};


export type MutationRegisterArgs = {
  input: RegisterUserInput;
};


export type MutationRequestResetPasswordArgs = {
  new_password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationRequestResetPasswordLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationSubmitPersonalityBucketQuestionArgs = {
  input?: InputMaybe<Array<UserBucketQuestionResponseInput>>;
};


export type MutationSubmitUserInterestArgs = {
  input: UserInterestInputs;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserSchedulesArgs = {
  input: SchedulesInput;
};


export type MutationVerifyUserArgs = {
  access_token: Scalars['String']['input'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type PersonalityBucketType = {
  __typename?: 'PersonalityBucketType';
  bucketQuestions?: Maybe<Array<BucketQuestion>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  scores?: Maybe<Array<PersonalityScore>>;
  sub_title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};

export type PersonalityScore = {
  __typename?: 'PersonalityScore';
  agreeableness?: Maybe<Scalars['String']['output']>;
  conscientiousness?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  extroversion?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  last_computed?: Maybe<Scalars['DateTime']['output']>;
  narcissism?: Maybe<Scalars['String']['output']>;
  neuroticism?: Maybe<Scalars['String']['output']>;
  openness?: Maybe<Scalars['String']['output']>;
  personalityBucketType?: Maybe<PersonalityBucketType>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type ProfileInput = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  gender?: InputMaybe<GenderEnum>;
  health_rating?: InputMaybe<Scalars['String']['input']>;
  level_of_education?: InputMaybe<Scalars['String']['input']>;
  political_orientation?: InputMaybe<Scalars['String']['input']>;
  race?: InputMaybe<Scalars['String']['input']>;
  relationship_status?: InputMaybe<Scalars['String']['input']>;
  socialization?: InputMaybe<Scalars['String']['input']>;
  to_socialization?: InputMaybe<Scalars['String']['input']>;
  zip_code?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  answerResponses?: Maybe<Array<QuestionResponse>>;
  interests?: Maybe<Array<Interest>>;
  interestsByNoneTrait?: Maybe<Array<Interest>>;
  interestsByTrait?: Maybe<Array<Interest>>;
  me?: Maybe<User>;
  onBoardCategoriesWithQuestions?: Maybe<Array<QuestionCategory>>;
  questionCategories?: Maybe<Array<QuestionCategory>>;
  questions?: Maybe<Array<Question>>;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users: UserPaginator;
};


export type QueryAnswerResponsesArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryQuestionCategoriesArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQuestionsArgs = {
  category_id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersArgs = {
  first?: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Question = {
  __typename?: 'Question';
  category?: Maybe<QuestionCategory>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  options?: Maybe<Array<QuestionOption>>;
  sub_category?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  trait?: Maybe<Scalars['String']['output']>;
  type?: Maybe<AnswerTypeEnum>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type QuestionCategory = {
  __typename?: 'QuestionCategory';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maximum_attachable_questions?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  questions?: Maybe<Array<Question>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type QuestionOption = {
  __typename?: 'QuestionOption';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  question?: Maybe<Question>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type QuestionResponse = {
  __typename?: 'QuestionResponse';
  answer?: Maybe<QuestionOption>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Question>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type QuestionResponseGroupInput = {
  answers?: InputMaybe<Array<QuestionResponseInput>>;
};

export type QuestionResponseInput = {
  answer: Scalars['ID']['input'];
  question_id: Scalars['ID']['input'];
};

export type RegisterUserInput = {
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  profile?: InputMaybe<ProfileInput>;
};

export type Schedule = {
  __typename?: 'Schedule';
  day_name: DayName;
  id?: Maybe<Scalars['ID']['output']>;
  status: Scalars['Boolean']['output'];
  time_range?: Maybe<Array<TimeRange>>;
  user: User;
};

export type ScheduleInput = {
  day_name: DayName;
  id?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  time_range?: InputMaybe<Array<TimeRange>>;
};

export type SchedulesInput = {
  schedules?: InputMaybe<Array<ScheduleInput>>;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type SubmitUserInterestInput = {
  interest_id: Scalars['ID']['input'];
  response: Scalars['String']['input'];
};

export enum TimeRange {
  Afternoon = 'AFTERNOON',
  Evening = 'EVENING',
  Morning = 'MORNING'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateUserInput = {
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileInput>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  interests?: Maybe<Array<Interest>>;
  name: Scalars['String']['output'];
  personalityScore?: Maybe<PersonalityScore>;
  phone?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<UserProfile>;
  question_responses?: Maybe<Array<QuestionResponse>>;
  schedules?: Maybe<Array<Schedule>>;
  unique_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type UserBucketQuestionResponse = {
  __typename?: 'UserBucketQuestionResponse';
  bucket?: Maybe<PersonalityBucketType>;
  id: Scalars['ID']['output'];
  response: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type UserBucketQuestionResponseInput = {
  bucket_id: Scalars['ID']['input'];
  response: Scalars['String']['input'];
};

export type UserInterestInputs = {
  inputs: Array<SubmitUserInterestInput>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  avatar?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<GenderEnum>;
  health_rating?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  level_of_education?: Maybe<Scalars['String']['output']>;
  political_orientation?: Maybe<Scalars['String']['output']>;
  race?: Maybe<Scalars['String']['output']>;
  relationship_status?: Maybe<Scalars['String']['output']>;
  socialization?: Maybe<Scalars['String']['output']>;
  to_socialization?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  zip_code?: Maybe<Scalars['String']['output']>;
};

export type VerifyUserInput = {
  access_token: Scalars['String']['input'];
};

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, name: string } };

export type VerifyUserMutationVariables = Exact<{
  access_token: Scalars['String']['input'];
}>;


export type VerifyUserMutation = { __typename?: 'Mutation', verifyUser: { __typename?: 'BasicResponse', status: string, message?: string | null } };

export type Login_UserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Login_UserMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, name: string, phone?: string | null, email: string } } };

export type ResetPasswordLinkMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordLinkMutation = { __typename?: 'Mutation', requestResetPasswordLink: { __typename?: 'BasicResponse', status: string, message?: string | null } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  new_password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', requestResetPassword: { __typename?: 'BasicResponse', status: string, message?: string | null } };

export type QuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionsQuery = { __typename?: 'Query', questionCategories?: Array<{ __typename?: 'QuestionCategory', id: string, questions?: Array<{ __typename?: 'Question', id: string, text: string, sub_category?: string | null, options?: Array<{ __typename?: 'QuestionOption', id: string, title?: string | null, value?: string | null }> | null }> | null }> | null };

export type Interests_By_TraitsQueryVariables = Exact<{ [key: string]: never; }>;


export type Interests_By_TraitsQuery = { __typename?: 'Query', interestsByTrait?: Array<{ __typename?: 'Interest', id?: string | null, title?: string | null, interests?: Array<{ __typename?: 'Interest', id?: string | null, title?: string | null, image_url?: string | null }> | null }> | null };

export type Interests_By_None_TraitsQueryVariables = Exact<{ [key: string]: never; }>;


export type Interests_By_None_TraitsQuery = { __typename?: 'Query', interestsByNoneTrait?: Array<{ __typename?: 'Interest', id?: string | null, title?: string | null, interests?: Array<{ __typename?: 'Interest', id?: string | null, title?: string | null, image_url?: string | null }> | null }> | null };

export type Submit_User_InterestsMutationVariables = Exact<{
  input: UserInterestInputs;
}>;


export type Submit_User_InterestsMutation = { __typename?: 'Mutation', submitUserInterest?: { __typename?: 'BasicResponse', status: string, message?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: string, unique_id: string, name: string, email: string, phone?: string | null, profile?: { __typename?: 'UserProfile', avatar?: string | null } | null } | null };

export type Me_Question_ResponsesQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_Question_ResponsesQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, question_responses?: Array<{ __typename?: 'QuestionResponse', id: string, question?: { __typename?: 'Question', id: string } | null, answer?: { __typename?: 'QuestionOption', id: string, value?: string | null } | null }> | null } | null };

export type Me_SchedulesQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_SchedulesQuery = { __typename?: 'Query', me?: { __typename?: 'User', schedules?: Array<{ __typename?: 'Schedule', day_name: DayName, time_range?: Array<TimeRange> | null, status: boolean }> | null } | null };

export type Update_User_InfoMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type Update_User_InfoMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type Update_Profile_PictureMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type Update_Profile_PictureMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type UpdateUserScheduleMutationVariables = Exact<{
  input: SchedulesInput;
}>;


export type UpdateUserScheduleMutation = { __typename?: 'Mutation', updateUserSchedules?: Array<{ __typename?: 'Schedule', id?: string | null }> | null };

export type OnBoardCategoriesWithQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type OnBoardCategoriesWithQuestionsQuery = { __typename?: 'Query', onBoardCategoriesWithQuestions?: Array<{ __typename?: 'QuestionCategory', id: string, name: string, questions?: Array<{ __typename?: 'Question', id: string, text: string, type?: AnswerTypeEnum | null, options?: Array<{ __typename?: 'QuestionOption', id: string, title?: string | null, value?: string | null }> | null }> | null }> | null };

export type MePersonalityScoreQueryVariables = Exact<{ [key: string]: never; }>;


export type MePersonalityScoreQuery = { __typename?: 'Query', me?: { __typename?: 'User', personalityScore?: { __typename?: 'PersonalityScore', id?: string | null, personalityBucketType?: { __typename?: 'PersonalityBucketType', id: string, name?: string | null, sub_title?: string | null, image?: string | null, description?: string | null, bucketQuestions?: Array<{ __typename?: 'BucketQuestion', id: string, title?: string | null, text?: string | null }> | null } | null } | null } | null };

export type QuestionResponseMutationVariables = Exact<{
  input: QuestionResponseGroupInput;
}>;


export type QuestionResponseMutation = { __typename?: 'Mutation', questionResponse: { __typename?: 'BasicResponse', status: string, message?: string | null } };

export type SubmitPersonalityBucketQuestionMutationVariables = Exact<{
  input?: InputMaybe<Array<UserBucketQuestionResponseInput> | UserBucketQuestionResponseInput>;
}>;


export type SubmitPersonalityBucketQuestionMutation = { __typename?: 'Mutation', submitPersonalityBucketQuestion: { __typename?: 'BasicResponse', status: string, message?: string | null } };

export type Update_User_ProfileMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type Update_User_ProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', profile?: { __typename?: 'UserProfile', id: string, gender?: GenderEnum | null, race?: string | null, relationship_status?: string | null, level_of_education?: string | null, zip_code?: string | null, political_orientation?: string | null, socialization?: string | null, to_socialization?: string | null, health_rating?: string | null } | null } };

export type Query_UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type Query_UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPaginator', data: Array<{ __typename?: 'User', id: string, name: string }> } };


export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const VerifyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"access_token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"access_token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"access_token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyUserMutation, VerifyUserMutationVariables>;
export const Login_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOGIN_USER"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<Login_UserMutation, Login_UserMutationVariables>;
export const ResetPasswordLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPasswordLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestResetPasswordLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordLinkMutation, ResetPasswordLinkMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestResetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const QuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sub_category"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QuestionsQuery, QuestionsQueryVariables>;
export const Interests_By_TraitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"INTERESTS_BY_TRAITS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interestsByTrait"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}}]} as unknown as DocumentNode<Interests_By_TraitsQuery, Interests_By_TraitsQueryVariables>;
export const Interests_By_None_TraitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"INTERESTS_BY_NONE_TRAITS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interestsByNoneTrait"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}}]} as unknown as DocumentNode<Interests_By_None_TraitsQuery, Interests_By_None_TraitsQueryVariables>;
export const Submit_User_InterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SUBMIT_USER_INTERESTS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInterestInputs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitUserInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Submit_User_InterestsMutation, Submit_User_InterestsMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ME"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unique_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const Me_Question_ResponsesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ME_QUESTION_RESPONSES"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question_responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"answer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Me_Question_ResponsesQuery, Me_Question_ResponsesQueryVariables>;
export const Me_SchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ME_SCHEDULES"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day_name"}},{"kind":"Field","name":{"kind":"Name","value":"time_range"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<Me_SchedulesQuery, Me_SchedulesQueryVariables>;
export const Update_User_InfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_USER_INFO"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Update_User_InfoMutation, Update_User_InfoMutationVariables>;
export const Update_Profile_PictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_PROFILE_PICTURE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Update_Profile_PictureMutation, Update_Profile_PictureMutationVariables>;
export const UpdateUserScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SchedulesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserScheduleMutation, UpdateUserScheduleMutationVariables>;
export const OnBoardCategoriesWithQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OnBoardCategoriesWithQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onBoardCategoriesWithQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnBoardCategoriesWithQuestionsQuery, OnBoardCategoriesWithQuestionsQueryVariables>;
export const MePersonalityScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MePersonalityScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalityScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"personalityBucketType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sub_title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bucketQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MePersonalityScoreQuery, MePersonalityScoreQueryVariables>;
export const QuestionResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"QuestionResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionResponseGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<QuestionResponseMutation, QuestionResponseMutationVariables>;
export const SubmitPersonalityBucketQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitPersonalityBucketQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserBucketQuestionResponseInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitPersonalityBucketQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SubmitPersonalityBucketQuestionMutation, SubmitPersonalityBucketQuestionMutationVariables>;
export const Update_User_ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_USER_PROFILE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"relationship_status"}},{"kind":"Field","name":{"kind":"Name","value":"level_of_education"}},{"kind":"Field","name":{"kind":"Name","value":"zip_code"}},{"kind":"Field","name":{"kind":"Name","value":"political_orientation"}},{"kind":"Field","name":{"kind":"Name","value":"socialization"}},{"kind":"Field","name":{"kind":"Name","value":"to_socialization"}},{"kind":"Field","name":{"kind":"Name","value":"health_rating"}}]}}]}}]}}]} as unknown as DocumentNode<Update_User_ProfileMutation, Update_User_ProfileMutationVariables>;
export const Query_UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QUERY_USERS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<Query_UsersQuery, Query_UsersQueryVariables>;
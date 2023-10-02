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
    "\n  mutation Register($input: RegisterUserInput!) {\n    register(input: $input) {\n      id\n      name\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation VerifyUser($access_token: String!) {\n    verifyUser(access_token: $access_token) {\n      status\n      message\n    }\n  }\n": types.VerifyUserDocument,
    "\n  mutation LOGIN_USER($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n      }\n      token_type\n    }\n  }\n": types.Login_UserDocument,
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
export function gql(source: "\n  mutation Register($input: RegisterUserInput!) {\n    register(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterUserInput!) {\n    register(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyUser($access_token: String!) {\n    verifyUser(access_token: $access_token) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyUser($access_token: String!) {\n    verifyUser(access_token: $access_token) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LOGIN_USER($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n      }\n      token_type\n    }\n  }\n"): (typeof documents)["\n  mutation LOGIN_USER($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n      }\n      token_type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery QUERY_USERS {\n\t\tusers {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QUERY_USERS {\n\t\tusers {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
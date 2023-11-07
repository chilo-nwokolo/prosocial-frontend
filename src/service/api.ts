import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BASE_URL } from './request';
import { getCookie } from '../libs/cookies';
import { AccessToken } from '../utils/constants';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createHttpLink({
	uri: BASE_URL,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = getCookie(AccessToken);
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const uploadLink = createUploadLink({
  uri: BASE_URL,
});

const link = authLink.concat(httpLink);
		// @ts-ignore
const authUploadLink = authLink.concat(uploadLink);

export const client = new ApolloClient({
	link: ApolloLink.split(
    (operation) => {
      const operationName = operation.operationName;
      return operationName === 'UPDATE_PROFILE_PICTURE'; // Check if this is the uploadImage mutation
    },
    authUploadLink, // Use uploadLink for the specified mutation
    link // Use httpLink for all other queries and mutations
  ),
	cache: new InMemoryCache(),
	connectToDevTools: process.env.NODE_ENV === "development",
});

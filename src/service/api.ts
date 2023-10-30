import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BASE_URL } from './request';
import { getCookie } from '../libs/cookies';
import { AccessToken } from '../utils/constants';
// import { createUploadLink } from 'apollo-upload-client';

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

// const uploadLink = createUploadLink({
//   uri: BASE_URL,
// });

const link = authLink.concat(httpLink);

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	connectToDevTools: process.env.NODE_ENV === "development",
});

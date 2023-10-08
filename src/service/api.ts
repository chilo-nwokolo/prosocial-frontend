import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BASE_URL } from '.';
import { getCookie } from '../libs/cookies';

const httpLink = createHttpLink({
	uri: BASE_URL,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = getCookie('accessToken');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

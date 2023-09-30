// app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { client } from '@/service';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ApolloProvider client={client}>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
		</ApolloProvider>
	);
}

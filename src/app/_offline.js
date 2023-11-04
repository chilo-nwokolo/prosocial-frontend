import { appRouteLinks } from '@/utils/constants';
import { Box, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function Offline() {
	return (
		<Box
			as="section"
			border="1px solid"
			borderColor="gray.300"
			minH="100vh"
			maxWidth="lg"
			minWidth="xs"
			overflowY="auto"
			px="6"
			py="96"
			mx="auto"
		>
			<Text fontSize="3xl" fontWeight="bold">
				Sorry, you are offline
			</Text>
			<Link href={appRouteLinks.login}>
				<Button size="lg" mt="5">Return Home</Button>
			</Link>
		</Box>
	);
}

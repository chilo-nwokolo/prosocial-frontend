import { Box } from '@chakra-ui/react';

export default function ProLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<Box
			as="section"
			border="1px solid"
			borderColor="gray.300"
			minH="100vh"
			maxWidth="md"
			minWidth="xs"
			mx="auto"
      overflowY="auto"
		>
			{children}
		</Box>
	);
}

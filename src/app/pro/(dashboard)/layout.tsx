import NavBar from '@/components/General/NavBar';
import { Box } from '@chakra-ui/react';

export default function ProLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box as="section" maxWidth="lg" minWidth="xs" mx="auto">
			<NavBar />
			<Box
				as="section"
				border="1px solid"
				borderColor="gray.300"
				overflowY="auto"
				px="6"
				pt="10"
				pb="4"
				mt="14"
				minH="100vh"
			>
				{children}
			</Box>
		</Box>
	);
}

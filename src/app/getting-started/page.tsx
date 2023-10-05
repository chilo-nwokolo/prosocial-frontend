'use client';

import { appRouteLinks } from '@/utils/constants';
import { Box, Center, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const modes = [
	{ id: 1, name: 'Student Mode', route: appRouteLinks.welcome },
	{ id: 2, name: 'Demo Mode', route: appRouteLinks.welcome },
];

export default function Page() {
	const router = useRouter();
	return (
		<Center minH="100vh">
			<Flex flexDir="column" gap="10">
				{modes.map((mode) => (
					<Box
						key={mode.id}
						onClick={() => {
							router.push(mode.route);
						}}
						border="1px solid"
						borderColor="gray.400"
						textAlign="center"
						px="16"
            py="10"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.700", color: "white", fontWeight: "500" }}
					>
						{mode.name}
					</Box>
				))}
			</Flex>
		</Center>
	);
}

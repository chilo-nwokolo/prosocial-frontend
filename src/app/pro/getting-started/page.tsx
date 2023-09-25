import { Box, Center, Flex } from '@chakra-ui/react';

const modes = [
	{ id: 1, name: 'Student Mode', route: '/pro/student-login' },
	{ id: 2, name: 'Demo Mode', route: '/pro/demo-login' },
];

export default function Page() {
	return (
		<Center minH="100vh">
			<Flex flexDir="column" gap="10">
				{modes.map((mode) => (
					<Box
						key={mode.id}
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

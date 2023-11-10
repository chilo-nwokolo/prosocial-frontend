import { appRouteLinks } from '@/utils/constants';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function SuccessPage() {
	return (
		<Center h="90vh">
			<Box my="auto" w="full">
				<Text fontSize="2xl" fontWeight="medium" mb="5">
					Awesome!
				</Text>
				<Text>
					Now you need to set your social preferences so that we can pair you for an
					outing.
				</Text>
				<Flex flexDir="column" gap="4" mt="10">
					<Link href={`${appRouteLinks.socialPreference}?newUser=true`}>
						<Button w="full">Next</Button>
					</Link>
				</Flex>
			</Box>
		</Center>
	);
}

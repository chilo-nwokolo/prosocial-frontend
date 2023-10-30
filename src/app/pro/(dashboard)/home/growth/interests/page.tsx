import BackButton from '@/components/General/BackButton';
import { Button, Center, Flex, Text } from '@chakra-ui/react';

export default function InterestsPage() {
	return (
		<Center h="80vh">
			<Flex flexDir="column" w="full" h="full" gap="5">
        <BackButton />
				<Flex flexDir="column" h="full" justifyContent="center" gap="4">
					<Text fontSize="2xl" fontWeight="semibold">
						Talents and gifts inventory
					</Text>
					<Text mt="2">
						You will be shown pairs of photographs. All you have to do is choose which one
						you like more. This will help us match your interests with others who enjoy
						similar types of activities.
					</Text>
				</Flex>
				<Button mt="auto">Begin</Button>
			</Flex>
		</Center>
	);
}

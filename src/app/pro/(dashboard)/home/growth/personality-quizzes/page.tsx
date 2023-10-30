import { Flex, Text } from '@chakra-ui/react';
import BackButton from '@/components/General/BackButton';

export default function PersonalityQuizzesPage() {
	return (
		<Flex flexDir="column" w="full" gap="5">
			<BackButton />
			<Flex flexDir="column">
				<Text fontSize="2xl" fontWeight="semibold">Quizzes</Text>
				<Text mt="2">
					Below are three quizzes that will help us get to know you better. By answering
					these questions, you will receive more feedback on your personality and we will
					be able to better match you with potential
				</Text>
			</Flex>
		</Flex>
	);
}

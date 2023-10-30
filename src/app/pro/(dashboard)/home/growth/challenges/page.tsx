import BackButton from '@/components/General/BackButton';
import { Flex, Text } from '@chakra-ui/react';

export default function ChallengesPage() {
	return (
		<Flex flexDir="column" w="full" gap="5">
			<BackButton />
			<Flex flexDir="column">
				<Text fontSize="2xl" fontWeight="semibold">
					Challenges
				</Text>
				<Text mt="2">
					Below are a series of personal challenges. We recommend one challenge per day.
					After you have completed the challenge, you will be prompted to journal about
					your experiences.
				</Text>
			</Flex>
		</Flex>
	);
}

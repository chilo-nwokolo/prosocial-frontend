'use client';
import { useAppQuestions } from '@/store';
import { appRouteLinks } from '@/utils/constants';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function GrowthPage() {
	const [userPersonalityAnswers] = useAppQuestions((state) => [state.userPersonalityAnswers]);

	const checkAnswers = (answers: { [id: string]: number }[]) => {
		let completed = 0;

		answers.forEach((value) => {
			const data = Object.values(value);
			if (data[0] === 10) {
				completed++;
			} 
		})
		return completed;
	}

	checkAnswers(userPersonalityAnswers);

	const growthSections = [
		{
			id: 1,
			title: 'Personality Quizzes',
			description: 'Learn about yourself and get even better social matches',
			progress: 3,
			destination: appRouteLinks.growthPersonality,
			answers: checkAnswers(userPersonalityAnswers),
		},
		{
			id: 2,
			title: 'Interests',
			description:
				'Tell us about your interests so we can help you find like-minded people',
			progress: 1,
			destination: appRouteLinks.growthInterests,
			answers: 0,
		},
		{
			id: 3,
			title: 'Journaling',
			description:
				'Spend time in self-reflection to discover your strengths and growth areas',
			progress: 4,
			destination: appRouteLinks.growthJournal,
			answers: 0,
		},
		{
			id: 4,
			title: 'Challenges',
			description: 'We give you daily goals that provide opportunities for personal growth',
			progress: 3,
			destination: appRouteLinks.growthChallenges,
			answers: 0,
		},
	];

	const calculateProgress = (qty: number, total: number) => {
		if (qty === 0) return `white 100%`;
		const breakdown = 100 / total;

		return `green ${(breakdown * qty)}%, white 0%`;
	}

	return (
		<Flex flexDir="column" w="full" gap="5">
			<Text fontSize="2xl" textAlign="center" fontWeight="semibold">
				Growth
			</Text>
			<SimpleGrid columns={2} gap="4">
				{growthSections.map((section) => (
					<Link href={section.destination} key={section.id}>
						<Flex
							flexDir="column"
							border="1px solid"
							borderColor="gray.500"
							pt="16"
							borderRadius="md"
						  h="full"
							overflow="hidden"
						>
							<Flex px="5" pb="16" flexDir="column" gap="4">
								<Text fontWeight="semibold" fontSize="2xl">
									{section.title}
								</Text>
								<Text>{section.description}</Text>
							</Flex>
							<Box mt="auto" bg={`linear-gradient(to right, ${calculateProgress(section.answers, section.progress)})`} borderTop="1px solid" w="full" p="2">
								{section.answers}/{section.progress}
							</Box>
						</Flex>
					</Link>
				))}
			</SimpleGrid>
		</Flex>
	);
}

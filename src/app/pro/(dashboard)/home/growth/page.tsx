import { appRouteLinks } from '@/utils/constants';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';

const growthSections = [
	{
		id: 1,
		title: 'Personality Quizzes',
		description: 'Learn about yourself and get even better social matches',
		progress: 3,
		destination: appRouteLinks.growthPersonality,
	},
	{
		id: 2,
		title: 'Interests',
		description:
			'Tell us about your interests so we can help you find like-minded people',
		progress: 1,
		destination: appRouteLinks.growthInterests,
	},
	{
		id: 3,
		title: 'Journaling',
		description:
			'Spend time in self-reflection to discover your strengths and growth areas',
		progress: 4,
		destination: appRouteLinks.growthJournal,
	},
	{
		id: 4,
		title: 'Challenges',
		description: 'We give you daily goals that provide opportunities for personal growth',
		progress: 3,
		destination: appRouteLinks.growthChallenges,
	},
];

export default function GrowthPage() {
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
						>
							<Flex px="5" pb="16" flexDir="column" gap="4">
								<Text fontWeight="semibold" fontSize="2xl">
									{section.title}
								</Text>
								<Text>{section.description}</Text>
							</Flex>
							<Box mt="auto" borderTop="1px solid" w="full" p="2">
								0/{section.progress}
							</Box>
						</Flex>
					</Link>
				))}
			</SimpleGrid>
		</Flex>
	);
}

import { Flex, Text } from '@chakra-ui/react';
import GrowthLayoutWrapper from '@/features/dashboard/home/growth/components/GrowthLayoutWrapper';
import { appRouteLinks } from '@/utils/constants';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

const differentChallenges = [
	'Interesting or Funny Story',
	'Commitments',
	'Curiosity',
];

export default function ChallengesPage() {
	return (
		<GrowthLayoutWrapper
			title="Challenges"
			description="Below are a series of personal challenges. We recommend one challenge per day.
			After you have completed the challenge, you will be prompted to journal about
			your experiences."
		>
			<Flex flexDir="column" gap="5" mt="4">
				{differentChallenges.map((challenge, i) => (
					<Link href={`${appRouteLinks.growthChallenges}/${i + 1}`} key={challenge}>
						<Flex
							w="full"
							border="1px solid"
							borderRadius="lg"
							px="5"
							py="8"
							borderColor="black"
							justifyContent="space-between"
							alignItems="center"
						>
							<Text fontSize="xl" w="56" fontWeight="medium">
								{i + 1}: {challenge}
							</Text>
							<Text>
								<FaChevronRight />
							</Text>
						</Flex>
					</Link>
				))}
			</Flex>
		</GrowthLayoutWrapper>
	);
}

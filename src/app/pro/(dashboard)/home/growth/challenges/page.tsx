'use client';
import { Flex, Text } from '@chakra-ui/react';
import GrowthLayoutWrapper from '@/features/dashboard/home/growth/components/GrowthLayoutWrapper';
import { appRouteLinks } from '@/utils/constants';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import { QUERY_CHALLENGE_CATEGORIES } from '@/features/dashboard/home/growth/queries';
import QueryContainer from '@/components/General/QueryContainer';

export default function ChallengesPage() {
	const {	data, loading, error } = useQuery(QUERY_CHALLENGE_CATEGORIES);

	return (
		<QueryContainer loading={loading} error={error}>
			<GrowthLayoutWrapper
				title="Challenges"
				description="Below are a series of personal challenges. We recommend one challenge per day.
				After you have completed the challenge, you will be prompted to journal about
				your experiences."
				destination={appRouteLinks.growth}
			>
				<Flex flexDir="column" gap="5" mt="4">
					{data?.challengeCategories?.map((challenge, i) => (
						<Link href={`${appRouteLinks.growthChallenges}/${challenge.id}`} key={challenge.id}>
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
									{i + 1}: {challenge.title}
								</Text>
								<Text>
									<FaChevronRight />
								</Text>
							</Flex>
						</Link>
					))}
				</Flex>
			</GrowthLayoutWrapper>
		</QueryContainer>
	);
}

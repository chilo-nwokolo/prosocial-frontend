'use client';
import { Flex, Text } from '@chakra-ui/react';
import BackButton from '@/components/General/BackButton';
import QueryContainer from '@/components/General/QueryContainer';
import usePersonalityQuizzesPage from '@/features/dashboard/hooks/usePersonalityQuizzesPage';
import { FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { appRouteLinks } from '@/utils/constants';

const questionCategories = ['Personality 1', 'Personality 2', 'Personality 3'];

export default function PersonalityQuizzesPage() {
	const { error, loading } = usePersonalityQuizzesPage();

	return (
		<QueryContainer loading={loading} error={error}>
			<Flex flexDir="column" w="full" gap="5">
				<BackButton destination={appRouteLinks.growth} />
				<Flex flexDir="column">
					<Text fontSize="2xl" fontWeight="semibold">
						Quizzes
					</Text>
					<Text mt="2">
						Below are three quizzes that will help us get to know you better. By answering
						these questions, you will receive more feedback on your personality and we
						will be able to better match you with potential
					</Text>
					<Flex mt="5" flexDir="column" gap="4">
						{questionCategories.map((question) => (
							<Link href={`${appRouteLinks.growthPersonality}/${question}`} key={question}>
								<Flex
									w="full"
									border="1px solid"
									borderRadius="lg"
									px="5"
									py="10"
									borderColor="black"
									justifyContent="space-between"
									alignItems="center"
								>
									<Flex flexDir="column" gap="3">
										<Text fontSize="lg" fontWeight="semibold">{question}</Text>
										<Text>10 questions</Text>
									</Flex>
									<Text>
										<FaChevronRight />
									</Text>
								</Flex>
							</Link>
						))}
					</Flex>
				</Flex>
			</Flex>
		</QueryContainer>
	);
}

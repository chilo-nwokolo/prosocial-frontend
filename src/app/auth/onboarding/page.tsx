'use client';

import { Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { appRouteLinks } from '@/utils/constants';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '@/features/intro/gql/queries';
import { useOnboardQuestions } from '@/store';
import { QuestionsCategoryQuery } from '@/__generated__/graphql';
import { sampleData } from '@/features/intro/questions';

export default function OnboardingPage() {
	const router = useRouter();
	const [updateQuestions] = useOnboardQuestions((state) => [state.updateQuestions]);

	const restructureQuestions = (questions: QuestionsCategoryQuery) => {
		return questions.questionCategories?.map((category) => {
			return {
				id: category.id,
				category: category.name.replace('&', 'and'),
				meta: sampleData[parseInt(category.id) - 1]?.meta,
				description: sampleData[parseInt(category.id) - 1]?.description,
				totalQuestions:
					category.id === '1'
						? sampleData[0].questions?.length
						: category.questions?.length,
				questions: category.id === '1' ? sampleData[0].questions : category.questions,
			};
		});
	};

	const { loading, error } = useQuery(QUERY_QUESTIONS, {
		onCompleted: (data) => {
			const result = restructureQuestions(data);
			updateQuestions(result);
			setTimeout(() => {
				router.push(appRouteLinks.intro);
			}, 1000);
		},
	});
	const toast = useToast();

	if (error) {
		return toast({
			title: error.message,
			status: 'error',
		});
	}

	return (
		<Center h="100vh">
			<Flex flexDir="column" alignItems="center" gap="5">
				<Spinner size="xl" />
				<Text fontSize="xl" fontWeight="medium" textAlign="center">
					{loading ? 'fetching data...' : 'Logging in...'}
				</Text>
			</Flex>
		</Center>
	);
}

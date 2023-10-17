'use client';

import { Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { appRouteLinks } from '@/utils/constants';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '@/features/intro/gql';
import { useOnboardQuestions } from '@/store';
import { transformQuestions } from '@/features/intro/helpers';

export default function OnboardingPage() {
	const router = useRouter();
	const [updateQuestions] = useOnboardQuestions((state) => [state.updateQuestions]);

	const { loading, error } = useQuery(QUERY_QUESTIONS, {
		onCompleted: (data) => {
			const result = transformQuestions(data);
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

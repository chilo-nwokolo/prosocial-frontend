'use client';

import { Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { appRouteLinks } from '@/utils/constants';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '@/features/intro/gql';
import { useOnboardQuestions } from '@/store';
import { transformQuestions } from '@/features/intro/helpers';
import { apolloErrorHandler } from '@/utils/helpers';
import { deleteCookie } from '@/libs/cookies';

export default function OnboardingPage() {
	const router = useRouter();
	const [updateQuestions] = useOnboardQuestions((state) => [state.updateQuestions]);

	const toast = useToast();

	const { loading } = useQuery(QUERY_QUESTIONS, {
		onCompleted: (data) => {
			const result = transformQuestions(data);
			updateQuestions(result);
			setTimeout(() => {
				router.push(appRouteLinks.intro);
			}, 1000);
		},
		onError: (error) => {
			toast({
				title: apolloErrorHandler(error),
				status: 'error',
			});
			deleteCookie('accessToken')
		}
	});


	return (
		<Center h="100vh">
			<Flex flexDir="column" alignItems="center" gap="5">
				<Spinner size="xl" />
				<Text fontSize="xl" fontWeight="medium" textAlign="center">
					{loading ? 'Logging in...' : 'fetching data...'}
				</Text>
			</Flex>
		</Center>
	);
}

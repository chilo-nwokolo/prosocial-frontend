'use client';
import BackButton from '@/components/General/BackButton';
import QueryContainer from '@/components/General/QueryContainer';
import InterestsAccordion from '@/features/dashboard/home/growth/components/InterestsAccordion';
import InterestsSwitch from '@/features/dashboard/home/growth/components/InterestsSwitch';
import {
	INTERESTS_BY_NONE_TRAITS,
	SUBMIT_USER_INTERESTS,
} from '@/features/dashboard/home/growth/queries';
import { useAppQuestions } from '@/store';
import { appRouteLinks } from '@/utils/constants';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Flex, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { GrClose } from 'react-icons/gr';

export default function InterestedExtendedPage() {
	const { data: result, loading: isLoading, error } = useQuery(INTERESTS_BY_NONE_TRAITS);

	const [interestsAnswer, updateInterestsAnswer] = useAppQuestions((state) => [
		state.interestsAnswer,
		state.updateInterestsAnswer,
	]);
	const toast = useToast();
	const router = useRouter();

	const [mutate, { loading }] = useMutation(SUBMIT_USER_INTERESTS, {
		variables: {
			input: {
				inputs: interestsAnswer,
			},
		},
		onError: () => {
			toast({
				status: 'error',
				title: 'Unable to save interests. Please try again.',
			});
		},
		onCompleted: () => {
			toast({
				status: 'success',
				title: 'Interests updated successfully',
			});
			router.push(appRouteLinks.growth);
		},
	});

	const onChange = (value: string, id: string) => {
		const foundIndex = interestsAnswer.findIndex(
			(interest) => interest.interest_id === id,
		);

		if (foundIndex < 0) {
			updateInterestsAnswer([...interestsAnswer, { response: value, interest_id: id }]);
		} else if (foundIndex >= 0) {
			const result = [...interestsAnswer];
			result.splice(foundIndex, 1);
			updateInterestsAnswer(result);
		}
	};

	return (
		<QueryContainer loading={isLoading} error={error}>
			<Flex flexDir="column">
				<Flex justifyContent="flex-end">
					<BackButton icon={<GrClose />} destination={appRouteLinks.interestsExpaned} />
				</Flex>
				<Text fontWeight="lg" fontSize="2xl">
					What are your interests
				</Text>
				<Flex flexDir="column" mt="4">
					{result?.interestsByNoneTrait?.length ? (
						result?.interestsByNoneTrait?.map((trait) => (
							<InterestsAccordion
								key={trait.id}
								title={trait.title as string}
								id={trait.id as string}
								onChange={onChange}
							>
								<Flex flexDir="column">
									<RadioGroup>
										<Stack>
											{trait?.interests?.map((interest, i) => (
												<Flex
													key={interest.id}
													p="3"
													bg={i % 2 === 0 ? '#f4ede2' : 'transparent'}
												>
													<InterestsSwitch interest={interest} onChange={onChange} />
												</Flex>
											))}
										</Stack>
									</RadioGroup>
								</Flex>
							</InterestsAccordion>
						))
					) : (
						<Flex flexDir="column" alignItems="center" gap="4" mt="4">
							<Text>
								Sorry we were unable to fetch this data. Kindly click on the Go Back
								button and click on Begin to try again.
							</Text>
							<BackButton text="Go Back" />
						</Flex>
					)}
				</Flex>
				<Button isLoading={loading} onClick={() => mutate()} mt="10">
					Done
				</Button>
			</Flex>
		</QueryContainer>
	);
}

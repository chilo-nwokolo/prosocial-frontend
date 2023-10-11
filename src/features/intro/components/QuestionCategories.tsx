'use client';

import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import { appRouteLinks } from '@/utils/constants';
import { useOnboardQuestions } from '@/store';
import { useMutation } from '@apollo/client';
import { SURVEY_RESPONSE, UPDATE_USER_PROFILE } from '../gql';
import { combineIntoFormattedArray } from '@/utils/helpers';
import LoadingModal from '@/components/General/LoadingModal';

export default function QuestionCategories() {
	const [questions, answers] = useOnboardQuestions((state: any) => [
		state.questions,
		state.answers,
	]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	
	const [updateProfile] =
		useMutation(UPDATE_USER_PROFILE);
	const [submitSurvey] =
		useMutation(SURVEY_RESPONSE);

	const onSubmit = async () => {
		onOpen();
		const profileAnswers = answers['The-basics'];

		await updateProfile({
			variables: {
				input: {
					profile: profileAnswers,
				},
			},
		});

		delete answers['The-basics'];

		const allAnswers = Object.values(answers).flat() as any;

		console.log(allAnswers);

		const formattedAnswers = combineIntoFormattedArray(allAnswers);

		await submitSurvey({
			variables: {
				input: {
					answers: formattedAnswers,
				},
			},
		});

		onClose();
	};

	return (
		<>
			<Flex flexDir="column">
				<Flex flexDir="column" gap="8" mt="10">
					{questions?.map((question: any) => (
						<Link key={question.id} href={`${appRouteLinks.intro}/${question.category}`}>
							<Flex
								border="1px solid"
								alignItems="center"
								borderColor="gray.400"
								py="16"
								px="5"
								borderRadius="lg"
								cursor="pointer"
							>
								<Flex flexDir="column" gap="2">
									<Text fontWeight="semibold" fontSize="lg">
										{question.category}
									</Text>
									<Text>
										{
											Object.values(answers?.[question.category.replace(' ', '-')] || '')?.length
										}
										/{question.totalQuestions}
									</Text>
								</Flex>
								<Text ml="auto">
									<FaChevronRight />
								</Text>
							</Flex>
						</Link>
					))}
				</Flex>
				<Button mt="10" onClick={onSubmit}>
					View Results
				</Button>
			</Flex>
			<LoadingModal isOpen={isOpen} onClose={onClose} loadingText="Submitting..." />
		</>
	);
}

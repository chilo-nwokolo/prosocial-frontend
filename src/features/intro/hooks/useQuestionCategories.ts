import { useOnboardQuestions } from '@/store';
import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { SURVEY_RESPONSE, UPDATE_USER_PROFILE } from '../gql';
import { appRouteLinks } from '@/utils/constants';
import { apolloErrorHandler, combineIntoFormattedArray } from '@/utils/helpers';

export default function useQuestionCategories() {
	const [questions, answers] = useOnboardQuestions((state: any) => [
		state.questions,
		state.answers,
	]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();
	const toast = useToast();

	const [updateProfile] = useMutation(UPDATE_USER_PROFILE, {
		onError: (error) => {
			toast({
				status: 'error',
				title: apolloErrorHandler(error),
			});
			onClose();
		},
	});
	const [submitSurvey] = useMutation(SURVEY_RESPONSE, {
		onError: (error) => {
			onClose();
			toast({
				status: 'error',
				title: apolloErrorHandler(error),
			});
		},
		onCompleted: () => {
			onClose();
			router.push(appRouteLinks.result);
		},
	});

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

		const formattedAnswers = combineIntoFormattedArray(allAnswers);

		await submitSurvey({
			variables: {
				input: {
					answers: formattedAnswers,
				},
			},
		});
	};

	return { isOpen, questions, onSubmit, onClose, answers } as const;
}

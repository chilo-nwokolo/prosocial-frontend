import { useAppQuestions } from '@/store';
import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { QUESTION_RESPONSE_MUTATION, UPDATE_USER_PROFILE } from '../gql';
import { appRouteLinks } from '@/utils/constants';
import { apolloErrorHandler, combineIntoFormattedArray } from '@/utils/helpers';

export default function useQuestionCategories() {
	const [onboardQuestions, onboardAnswers] = useAppQuestions((state) => [
		state.onboardQuestions,
		state.onboardAnswers,
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
	const [submitSurvey] = useMutation(QUESTION_RESPONSE_MUTATION, {
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

	const getQuestionsAnswersCount = () => {
		const answersObject = Object?.values(onboardAnswers || {}).flat();

		const questionsLength = onboardQuestions.reduce((acc: number, curr: any) => {
			return acc + curr.questions.length;
		}, 0);
		const answersLength = answersObject.reduce((acc: number, curr: any) => {
			return acc + Object.keys(curr).length;
		}, 0);
		return questionsLength === answersLength;
	}

	const onSubmit = async () => {
		onOpen();
		const profileAnswers = onboardAnswers['The-basics'];

		await updateProfile({
			variables: {
				input: {
					profile: profileAnswers,
				},
			},
		});

		delete onboardAnswers['The-basics'];

		const allAnswers = Object.values(onboardAnswers).flat() as any;

		const formattedAnswers = combineIntoFormattedArray(allAnswers);

		await submitSurvey({
			variables: {
				input: {
					answers: formattedAnswers,
				},
			},
		});
	};

	return { isOpen, onboardQuestions, onSubmit, onClose, onboardAnswers, getQuestionsAnswersCount } as const;
}

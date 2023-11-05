'use client';
import { useToast } from '@chakra-ui/react';
import { appRouteLinks } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { UserQuestionsType, useAppQuestions, useUser } from '@/store';
import { useMutation } from '@apollo/client';
import { QUESTION_RESPONSE_MUTATION } from '@/features/intro/gql';
import { apolloErrorHandler, combineIntoFormattedArray } from '@/utils/helpers';

type Props = {
	quizId: string;
};

export default function usePersonalityQuestionsPage({ quizId }: Props) {
	const router = useRouter();
	const toast = useToast();
	const [sectionQuestions, setSectionQuestions] = useState<
		UserQuestionsType[] | undefined
	>(undefined);
	const [questions] = useUser((state) => [state.questions]);
	const [userPersonalityAnswers, updateUserPersonalityAnswers] = useAppQuestions(
		(state) => [state.userPersonalityAnswers, state.updateUserPersonalityAnswers],
	);

	useEffect(() => {
		const sectionQuestions = questions?.filter(
			(question) => question.sub_category === decodeURI(quizId),
		);
		if (!sectionQuestions?.length) {
			router.back();
		}
		setSectionQuestions(sectionQuestions);
		return () => {
			setSectionQuestions(undefined);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quizId, questions]);

	const genDefaultValues = () => {
		const result: { [index: string]: string } = {};
		sectionQuestions?.forEach((element) => {
			result[element.id] = '';
		});
		return result;
	};

	// eslint-disable-next-line no-unused-vars
	const [submitAnswers, { loading }] = useMutation(QUESTION_RESPONSE_MUTATION, {
		onError: (error) => {
			toast({
				status: 'error',
				title: apolloErrorHandler(error),
			});
		},
		onCompleted: () => {
			toast({
				title: 'Saved successfully',
				status: 'success',
			});
			router.push(appRouteLinks.growthPersonality);
		},
	});

	const formik = useFormik({
		initialValues: genDefaultValues(),
		onSubmit: async (values) => {
      const location = decodeURI(quizId);
      const locationIndex = userPersonalityAnswers.findIndex((answer) => answer[location])

      if (locationIndex < 0) {
        updateUserPersonalityAnswers([...userPersonalityAnswers, { [location]: Object.values(values).length }])
      } else {
        const newArray = [...userPersonalityAnswers];
        newArray.splice(locationIndex, 1, { [location]: Object.values(values).length });
        updateUserPersonalityAnswers(newArray);
      }
      
			const formattedAnswers = combineIntoFormattedArray([values]);
			await submitAnswers({
				variables: {
					input: { answers: formattedAnswers },
				},
			});
		},
	});

	return { formik, router, sectionQuestions, loading } as const;
}

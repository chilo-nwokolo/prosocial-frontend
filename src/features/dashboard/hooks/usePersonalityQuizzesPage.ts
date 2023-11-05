import { useQuery } from '@apollo/client';
import { ALL_QUESTIONS } from '../home/growth/queries';
import { useAppQuestions, useUser } from '@/store';

export default function usePersonalityQuizzesPage() {
	const [questions, updateQuestions] = useUser((state) => [
		state.questions,
		state.updateQuestions,
	]);
	const [userPersonalityAnswers] = useAppQuestions((state) => [
		state.userPersonalityAnswers,
	]);

	const { loading, error } = useQuery(ALL_QUESTIONS, {
		onCompleted: (data) => {
			const questions = data.questionCategories?.[1].questions;
			const questionsClone = [...questions!];
			const randomizedQuestions = questionsClone?.sort(() => Math.random() - 0.5);
			updateQuestions(randomizedQuestions);
		},
	});

	const checkIfCompleted = (question: string) => {
		const findIndex = userPersonalityAnswers.findIndex((answer) => answer[question]);

		if (findIndex < 0) return false;
		return userPersonalityAnswers[findIndex][question];
	};

	return { loading, error, questions, userPersonalityAnswers, checkIfCompleted };
}

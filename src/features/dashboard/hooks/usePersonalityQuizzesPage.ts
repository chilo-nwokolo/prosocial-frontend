import { useQuery } from '@apollo/client';
import { ALL_QUESTIONS } from '../home/growth/queries';
import { useAppQuestions, useUserStore } from '@/store';
import { ME_QUESTION_RESPONSES } from '../profile/gql/queries';

export default function usePersonalityQuizzesPage() {
	const [questions, updateQuestions] = useUserStore((state) => [
		state.questions,
		state.updateQuestions,
	]);
	const [userPersonalityAnswers, updateMeAnswers] = useAppQuestions((state) => [
		state.userPersonalityAnswers,
		state.updateMeAnswers
	]);

	const { loading, error } = useQuery(ALL_QUESTIONS, {
		onCompleted: (data) => {
			const questions = data.questionCategories?.[1].questions;
			updateQuestions(questions);
		},
	});

	useQuery(ME_QUESTION_RESPONSES, {
		onCompleted: (data) => {
			const answers = data.me?.question_responses?.map((q) => {
				return {
					questionId: q.question?.id || "",
					answerId: q.answer?.id || "",
					value: q.answer?.value || "",
				}
			})
			updateMeAnswers(answers || []);
		}
	});

	const checkIfCompleted = (question: string) => {
		const findIndex = userPersonalityAnswers.findIndex((answer) => answer[question]);

		if (findIndex < 0) return false;
		return userPersonalityAnswers[findIndex][question];
	};

	return { loading, error, questions, userPersonalityAnswers, checkIfCompleted };
}

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface QuestionsState {
	questions: any;
	// eslint-disable-next-line no-unused-vars
	updateQuestions: (questions: any) => void;
	answers: any;
	// eslint-disable-next-line no-unused-vars
	updateAnswers: (answers: any) => void;
	personalityBucketQuestions: string[];
	updatePersonalityBucketQuestions: (
		// eslint-disable-next-line no-unused-vars
		personalityBucketQuestions: string[],
	) => void;
}

export const useOnboardQuestions = create<QuestionsState>()(
	devtools(
		persist(
			(set) => ({
				questions: null,
				updateQuestions: (questions) => set({ questions }),
				answers: null,
				updateAnswers: (answers) => set({ answers }),
				personalityBucketQuestions: [],
				updatePersonalityBucketQuestions: (personalityBucketQuestions: string[]) =>
					set({ personalityBucketQuestions }),
			}),
			{ name: 'questions' },
		),
	),
);

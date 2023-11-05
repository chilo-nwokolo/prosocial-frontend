import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface QuestionsState {
	onboardQuestions: any;
	// eslint-disable-next-line no-unused-vars
	updateOnboardQuestions: (questions: any) => void;
	onboardAnswers: any;
	// eslint-disable-next-line no-unused-vars
	updateOnboardAnswers: (answers: any) => void;
	personalityBucketQuestions: string[];
	updatePersonalityBucketQuestions: (
		// eslint-disable-next-line no-unused-vars
		personalityBucketQuestions: string[],
	) => void;
}

export const useAppQuestions = create<QuestionsState>()(
	devtools(
		persist(
			(set) => ({
				onboardQuestions: null,
				updateOnboardQuestions: (onboardQuestions: any) => set({ onboardQuestions }),
				onboardAnswers: null,
				updateOnboardAnswers: (onboardAnswers: any) => set({ onboardAnswers }),
				personalityBucketQuestions: [],
				updatePersonalityBucketQuestions: (personalityBucketQuestions: string[]) =>
					set({ personalityBucketQuestions }),
			}),
			{ name: 'questions' },
		),
	),
);

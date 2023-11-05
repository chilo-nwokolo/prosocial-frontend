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
	userPersonalityAnswers: { [id: string] : number }[];
	// eslint-disable-next-line no-unused-vars
	updateUserPersonalityAnswers: (userPersonalityAnswers:  { [id: string] : number }[]) => void;
}

export const useAppQuestions = create<QuestionsState>()(
	devtools(
		persist(
			(set) => ({
				onboardQuestions: null,
				updateOnboardQuestions: (onboardQuestions) => set({ onboardQuestions }),
				onboardAnswers: null,
				updateOnboardAnswers: (onboardAnswers) => set({ onboardAnswers }),
				personalityBucketQuestions: [],
				updatePersonalityBucketQuestions: (personalityBucketQuestions) =>
					set({ personalityBucketQuestions }),
				userPersonalityAnswers: [],
				updateUserPersonalityAnswers: (userPersonalityAnswers) =>
				set({ userPersonalityAnswers }),
			}),
			{ name: 'prosocial_questions' },
		),
	),
);

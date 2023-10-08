import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface QuestionsState {
	questions: any;
	// eslint-disable-next-line no-unused-vars
	updateQuestions: (questions: any) => void;
}

export const useOnboardQuestions = create<QuestionsState>()(
	devtools(
		persist(
			(set) => ({
				questions: null,
				updateQuestions: (questions) => set({ questions }),
			}),
			{ name: 'questions' },
		),
	),
);

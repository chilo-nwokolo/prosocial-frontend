import { Login_UserMutation, MeQuery, TimeRange } from '@/__generated__/graphql';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ScheduleDateType = { day: string; timeRange: TimeRange[] | string[] | null | undefined; status: boolean }

export type UserQuestionsType = {
	__typename?: 'Question' | undefined;
	id: string;
	text: string;
	sub_category?: string | null | undefined;
	options?:
		| {
				id: string;
				title?: string | null | undefined;
				value?: string | null | undefined;
		  }[]
		| null
		| undefined;
};

interface UserState {
	user: Login_UserMutation | null;
	// eslint-disable-next-line no-unused-vars
	updateUser: (user: Login_UserMutation) => void;
	userProfile: MeQuery | null;
	// eslint-disable-next-line no-unused-vars
	setUserProfile: (userProfile: MeQuery) => void;
	questions: UserQuestionsType[] | null | undefined;
	// eslint-disable-next-line no-unused-vars
	updateQuestions: (questions: UserQuestionsType[] | null | undefined) => void;
	selectedSchedules: ScheduleDateType[];
	// eslint-disable-next-line no-unused-vars
	updateSelectedSchedules: (selectedSchedules: ScheduleDateType[]) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			updateUser: (user) => set({ user }),

			userProfile: null,
			setUserProfile: (userProfile) => set({ userProfile }),

			questions: [],
			updateQuestions: (questions) => set({ questions }),

			selectedSchedules: [],
      updateSelectedSchedules: (selectedSchedules) => set({ selectedSchedules }),
		}),
		{ name: 'prosocial_user' },
	),
);

import { Login_UserMutation, MeQuery } from '@/__generated__/graphql';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

export const useUser = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			updateUser: (user) => set({ user }),

			userProfile: null,
			setUserProfile: (userProfile) => set({ userProfile }),

			questions: [],
			updateQuestions: (questions) => set({ questions }),
		}),
		{ name: 'prosocial_user' },
	),
);

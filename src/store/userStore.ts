import { Login_UserMutation } from '@/__generated__/graphql';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
	user: Login_UserMutation | null;
	// eslint-disable-next-line no-unused-vars
	updateUser: (user: Login_UserMutation) => void;
}

export const useUser = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			updateUser: (user) => set({ user }),
		}),
		{ name: 'user' },
	),
);

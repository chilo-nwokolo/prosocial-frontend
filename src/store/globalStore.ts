import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ScheduleDateType = { day: string; time_range: string; status: boolean }

interface GlobalState {
	selectedSchedules: ScheduleDateType[];
	// eslint-disable-next-line no-unused-vars
	updateSelectedSchedules: (selectedSchedules: ScheduleDateType[]) => void;
}

export const useGlobalStore = create<GlobalState>()(
	persist(
		(set) => ({
			selectedSchedules: [],
      updateSelectedSchedules: (selectedSchedules) => set({ selectedSchedules }),
		}),
		{ name: 'prosocial_global' },
	),
);

/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {}

export const useGlobalStore = create<GlobalState>()(
	persist((set) => ({}), { name: 'prosocial_global' }),
);

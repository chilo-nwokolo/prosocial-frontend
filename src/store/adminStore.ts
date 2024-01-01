/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  activeFilters: string[];
  // eslint-disable-next-line no-unused-vars
  updateActiveFilters: (filter: string[]) => void;
  usersFilter: any[];
  // eslint-disable-next-line no-unused-vars
  updateUsersFilter: (userFilter: any) => void;
}

export const useGlobalStore = create<AdminState>()((set) => ({
  activeFilters: [],
  updateActiveFilters: (activeFilters) => set({ activeFilters }),
  usersFilter: [],
  updateUsersFilter: (usersFilter) => set({ usersFilter }),
}));

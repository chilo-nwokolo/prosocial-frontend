/* eslint-disable no-unused-vars */
import { Pull_User_GroupQuery } from "@/__generated__/graphql";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type feedbackQuery = {
  userId: string;
  groupId: string;
};

export type InteractionFeedbackType = {
  connection: string;
  userId: string;
  name: string;
};

type pullUserGroupData = Pull_User_GroupQuery["pullUserGroupParticipants"];

interface GlobalState {
  outingDate: string;
  // eslint-disable-next-line no-unused-vars
  setOutingDate: (outingDate: string) => void;
  userData: feedbackQuery | null;
  setUserData: (userData: feedbackQuery | null) => void;
  groupData: pullUserGroupData | null;
  updateGroupData: (groupData: pullUserGroupData | null) => void;
  interactionFeedback: InteractionFeedbackType[] | [];
  setInteractionFeedback: ([
    { connection, userId },
  ]: InteractionFeedbackType[]) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      outingDate: "",
      setOutingDate: (outingDate) => set({ outingDate }),
      userData: null,
      setUserData: (userData) => set({ userData }),
      groupData: null,
      updateGroupData: (groupData) => set({ groupData }),
      interactionFeedback: [],
      setInteractionFeedback: (interactionFeedback) =>
        set({ interactionFeedback }),
    }),
    { name: "prosocial_global" },
  ),
);

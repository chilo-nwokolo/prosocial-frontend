/* eslint-disable no-unused-vars */
import {
  FeedbackResponse,
  Pull_User_GroupQuery,
} from "@/__generated__/graphql";
import { storeKeys } from "@/utils/constants";
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

export type GroupUser = {
  __typename?: "User" | undefined;
  id: string;
  name: string;
  unique_id: string;
  profile?:
    | {
        __typename?: "UserProfile" | undefined;
        avatar?: string | null | undefined;
      }
    | null
    | undefined;
};

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
  blockFromOuting: string[];
  updateBlockFromOuting: (blockFromOuting: string[]) => void;
  feedbackResponses: FeedbackResponse[];
  setFeedbackResponses: (feedbackResponses: FeedbackResponse[]) => void;
  excludeUsers: string[];
  setExcludeUsers: (excludeUsers: string[]) => void;
  outingGroupMembers: GroupUser[] | null;
  setOutingGroupMembers: (outingGroupMembers: GroupUser[] | null) => void;
  outingTextFeedback: string;
  setOutingTextFeedback: (outingTextFeedback: string) => void;
  participationConfirmation: string;
  setParticipationConfirmation: (participationConfirmation: string) => void;
  secondOuting: string;
  setSecondOuting: (secondOuting: string) => void;
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
      blockFromOuting: [],
      updateBlockFromOuting: (blockFromOuting) => set({ blockFromOuting }),
      feedbackResponses: [],
      setFeedbackResponses: (feedbackResponses) => set({ feedbackResponses }),
      excludeUsers: [],
      setExcludeUsers: (excludeUsers) => set({ excludeUsers }),
      outingGroupMembers: null,
      setOutingGroupMembers: (outingGroupMembers) =>
        set({ outingGroupMembers }),
      outingTextFeedback: "",
      setOutingTextFeedback: (outingTextFeedback) =>
        set({ outingTextFeedback }),
      participationConfirmation: "",
      setParticipationConfirmation: (participationConfirmation) =>
        set({ participationConfirmation }),
      secondOuting: "",
      setSecondOuting: (secondOuting) => set({ secondOuting }),
    }),
    { name: storeKeys.GLOBAL_STORE },
  ),
);

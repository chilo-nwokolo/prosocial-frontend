import { SubmitUserInterestInput } from "@/__generated__/graphql";
import { storeKeys } from "@/utils/constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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
  userPersonalityAnswers: { [id: string]: number }[];
  updateUserPersonalityAnswers: (
    // eslint-disable-next-line no-unused-vars
    userPersonalityAnswers: { [id: string]: number }[],
  ) => void;
  meAnswers: { questionId: string; answerId: string; value: string }[];
  updateMeAnswers: (
    // eslint-disable-next-line no-unused-vars
    meAnswers: { questionId: string; answerId: string; value: string }[],
  ) => void;
  interestsAnswer: SubmitUserInterestInput[];
  // eslint-disable-next-line no-unused-vars
  updateInterestsAnswer: (interestsAnswer: SubmitUserInterestInput[]) => void;
  socialPreferenceAnswers: { [id: number]: string };
  updateSocialPreferenceAnswers: (
    // eslint-disable-next-line no-unused-vars
    socialPreferenceAnswers: { [id: number]: string },
  ) => void;
  socialPreferenceReferrees: Record<string, string>;
  updateSocialPreferenceReferrees: (
    // eslint-disable-next-line no-unused-vars
    socialPreferenceReferrees: Record<string, string>,
  ) => void;
  submittedQuestions: boolean;
  // eslint-disable-next-line no-unused-vars
  updateSubmittedQuestions: (submittedQuestions: boolean) => void;
  submittedPreferences: boolean;
  // eslint-disable-next-line no-unused-vars
  updateSubmittedPreferences: (submittedPreferences: boolean) => void;
  submittedInterests: boolean;
  // eslint-disable-next-line no-unused-vars
  updateSubmittedInterests: (submittedInterests: boolean) => void;
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
        meAnswers: [],
        updateMeAnswers: (meAnswers) => set({ meAnswers }),
        interestsAnswer: [],
        updateInterestsAnswer: (interestsAnswer) => set({ interestsAnswer }),
        socialPreferenceAnswers: [],
        updateSocialPreferenceAnswers: (socialPreferenceAnswers) =>
          set({ socialPreferenceAnswers }),
        socialPreferenceReferrees: {},
        updateSocialPreferenceReferrees: (socialPreferenceReferrees) =>
          set({ socialPreferenceReferrees }),
        submittedQuestions: false,
        updateSubmittedQuestions: (submittedQuestions) =>
          set({ submittedQuestions }),
        submittedPreferences: false,
        updateSubmittedPreferences: (submittedPreferences) =>
          set({ submittedPreferences }),
        submittedInterests: false,
        updateSubmittedInterests: (submittedInterests) =>
          set({ submittedInterests }),
      }),
      { name: storeKeys.QUESTIONS_STORE },
    ),
  ),
);

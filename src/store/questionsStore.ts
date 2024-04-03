import {
  SubmitUserInterestInput,
  UserSocialPreferenceSubmitInput,
} from "@/__generated__/graphql";
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
  socialPreferenceAnswers: UserSocialPreferenceSubmitInput[];
  updateSocialPreferenceAnswers: (
    // eslint-disable-next-line no-unused-vars
    socialPreferenceAnswers: UserSocialPreferenceSubmitInput[],
  ) => void;
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
      }),
      { name: "prosocial_questions" },
    ),
  ),
);

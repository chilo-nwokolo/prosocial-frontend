import { useAppQuestions, useConfig } from "@/store";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { appRouteLinks, configExtras } from "@/utils/constants";
import { combineIntoFormattedArray } from "@/utils/helpers";
import { useMemo, useState } from "react";
import localStorageService from "@/service/localStorage";

export default function useQuestionCategories() {
  const [
    onboardQuestions,
    onboardAnswers,
    socialPreferenceAnswers,
    updateSubmittedQuestions,
    updateSubmittedPreferences,
  ] = useAppQuestions((state) => [
    state.onboardQuestions,
    state.onboardAnswers,
    state.socialPreferenceAnswers,
    state.updateSubmittedQuestions,
    state.updateSubmittedPreferences,
  ]);
  const [config] = useConfig((state) => [state.config]);
  // eslint-disable-next-line no-unused-vars
  const [_loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const getQuestionsAnswersCount = useMemo(() => {
    const answersObject = Object?.values(onboardAnswers || {}).flat();

    const questionsLength = onboardQuestions?.reduce(
      (acc: number, curr: any) => {
        const optionalQuestions = curr.questions.filter(
          (question: any) => question.optional,
        );
        return acc + (curr.questions.length - optionalQuestions.length);
      },
      0,
    );
    const answersLength = answersObject.reduce((acc: number, curr: any) => {
      let count = Object.keys(curr).length;
      if (curr.additional_political_orientation) {
        count -= 1;
      }
      return acc + count;
    }, 0);

    const result = questionsLength === answersLength;

    if (result) {
      updateSubmittedQuestions(true);
    }

    return result;
  }, [onboardAnswers, onboardQuestions, updateSubmittedQuestions]);

  const onSubmit = async () => {
    // Note: Removed blockers for submittedPreferences and submittedInterests
    // to allow proceeding without completing those sections

    setLoading(true);
    onOpen();

    try {
      const profileAnswers = onboardAnswers["The-basics"];

      // Update user profile
      localStorageService.updateUser({
        profile: profileAnswers,
      });

      const answersClone = { ...onboardAnswers };
      delete answersClone["The-basics"];

      const allAnswers = Object.values(answersClone).flat() as any;
      const formattedAnswers = combineIntoFormattedArray(allAnswers);

      // Submit question responses
      localStorageService.submitQuestionResponses(
        formattedAnswers.map((a: any) => ({
          question_id: a.question_id,
          answer_id: a.answer_id,
        })),
      );

      // Calculate personality score
      localStorageService.calculatePersonalityScore();

      toast({
        status: "success",
        title: "Responses saved successfully!",
      });

      onClose();
      router.push(appRouteLinks.result);
    } catch (error: any) {
      toast({
        status: "error",
        title: error.message || "Failed to submit responses",
      });
      onClose();
    }

    setLoading(false);
  };

  const calculateSocialPreferenceAnswers = useMemo(() => {
    const singleKeys = ["4", "5", "8", "12", "6"];

    let count = 0;

    if (!config[configExtras.user_has_filled_social_preferences]) {
      return `${count} / 5`;
    }

    for (let key in socialPreferenceAnswers) {
      if (singleKeys.includes(key)) {
        if (socialPreferenceAnswers[key].length) {
          count += 1;
        }
      }
    }

    if (count >= 4) {
      updateSubmittedPreferences(true);
    }

    return `${count} / 5`;
  }, [config, socialPreferenceAnswers, updateSubmittedPreferences]);

  return {
    isOpen,
    onboardQuestions,
    onSubmit,
    onClose,
    onboardAnswers,
    getQuestionsAnswersCount,
    calculateSocialPreferenceAnswers,
  } as const;
}

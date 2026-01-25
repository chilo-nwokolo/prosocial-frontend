import { useCallback, useEffect, useState } from "react";
import { useAppQuestions, useUserStore } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { configExtras } from "@/utils/constants";
import localStorageService from "@/service/localStorage";
import useAppConfig from "@/hooks/useAppConfig";

const questionConfigMap = {
  "Personality 1": configExtras.user_quiz_personality_1,
  "Personality 2": configExtras.user_quiz_personality_2,
  "Personality 3": configExtras.user_quiz_personality_3,
};

export default function usePersonalityQuizzesPage() {
  const [updateQuestions, personalityType] = useUserStore((state) => [
    state.updateQuestions,
    state.personalityType,
  ]);

  const [changedPersonality, setChangedPersonality] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPersonalityScore, setLoadingPersonalityScore] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  const [personalityScore, setPersonalityScore] = useState<any>(null);

  const { config, updateConfig } = useAppConfig({});

  const {
    onOpen: openPersonalityModal,
    onClose: closePersonalityModal,
    isOpen: isPersonalityModalOpen,
  } = useDisclosure();

  const [userPersonalityAnswers, updateMeAnswers] = useAppQuestions((state) => [
    state.userPersonalityAnswers,
    state.updateMeAnswers,
  ]);

  const queryPersonalityScore = useCallback(() => {
    setLoadingPersonalityScore(true);
    const score = localStorageService.getPersonalityScore();
    if (score) {
      const data = {
        me: {
          personalityScore: score,
        },
      };
      setPersonalityScore(data);

      if (personalityType?.name === score.personalityBucketType?.name) {
        setChangedPersonality(false);
      } else {
        setChangedPersonality(true);
      }
      openPersonalityModal();
      updateConfig([
        { key: configExtras.user_has_seen_retyped_result_1, value: "true" },
      ]);
    }
    setLoadingPersonalityScore(false);
  }, [personalityType, openPersonalityModal, updateConfig]);

  useEffect(() => {
    if (
      config?.[configExtras.user_quiz_personality_1] === "completed" &&
      config?.[configExtras.user_quiz_personality_2] === "completed" &&
      config?.[configExtras.user_quiz_personality_3] === "completed" &&
      !config?.[configExtras.user_has_seen_retyped_result_1]
    ) {
      queryPersonalityScore();
    }
  }, [config, queryPersonalityScore]);

  useEffect(() => {
    // Load questions from localStorage
    const categories = localStorageService.getQuestionCategories();
    const questions = categories?.[1]?.questions || [];
    updateQuestions(questions);

    // Load question responses
    const responses = localStorageService.getQuestionResponses();
    const answers = responses.map((q) => ({
      questionId: q.question?.id || "",
      answerId: q.answer?.id || "",
      value: q.answer?.value || "",
    }));
    updateMeAnswers(answers);

    setLoading(false);
  }, [updateQuestions, updateMeAnswers]);

  const checkIfCompleted = useCallback(
    (question: string) => {
      const result =
        config?.[questionConfigMap[question as keyof typeof questionConfigMap]];
      if (result === "completed") return true;
      return false;
    },
    [config],
  );

  return {
    loading,
    error,
    userPersonalityAnswers,
    checkIfCompleted,
    changedPersonality,
    personalityScore,
    loadingPersonalityScore,
    closePersonalityModal,
    isPersonalityModalOpen,
  };
}

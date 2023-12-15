import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_ALL_QUESTIONS } from "../home/growth/queries";
import { useAppQuestions, useUserStore } from "@/store";
import { ME_QUESTION_RESPONSES } from "../profile/gql/queries";
import useAppConfig from "@/hooks/useAppConfig";
import { useCallback, useEffect, useState } from "react";
import { QUERY_ME_PERSONALITY_SCORE } from "@/features/intro/gql";
import { useDisclosure } from "@chakra-ui/react";
import { configExtras } from "@/utils/constants";

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

  const [
    queryPersonalityScore,
    { data: personalityScore, loading: loadingPersonalityScore },
  ] = useLazyQuery(QUERY_ME_PERSONALITY_SCORE, {
    onCompleted: (data) => {
      if (
        personalityType?.name ===
        data.me?.personalityScore?.personalityBucketType?.name
      ) {
        setChangedPersonality(false);
      } else {
        setChangedPersonality(true);
      }
      openPersonalityModal();
      updateConfig([
        { key: configExtras.user_has_seen_retyped_result_1, value: "true" },
      ]);
    },
  });

  useEffect(() => {
    if (
      config?.[configExtras.user_quiz_personality_1] === "completed" &&
      config?.[configExtras.user_quiz_personality_2] === "completed" &&
      config?.[configExtras.user_quiz_personality_3] === "completed" &&
      !config?.[configExtras.user_has_seen_retyped_result_1]
    ) {
      queryPersonalityScore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const { loading, error } = useQuery(QUERY_ALL_QUESTIONS, {
    onCompleted: (data) => {
      const questions = data.questionCategories?.[1].questions;
      updateQuestions(questions);
    },
  });

  useQuery(ME_QUESTION_RESPONSES, {
    onCompleted: (data) => {
      const answers = data.me?.question_responses?.map((q) => {
        return {
          questionId: q.question?.id || "",
          answerId: q.answer?.id || "",
          value: q.answer?.value || "",
        };
      });
      updateMeAnswers(answers || []);
    },
  });

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

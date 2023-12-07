import { useQuery } from "@apollo/client";
import { QUERY_ALL_QUESTIONS } from "../home/growth/queries";
import { useAppQuestions, useUserStore } from "@/store";
import { ME_QUESTION_RESPONSES } from "../profile/gql/queries";
import useAppConfig from "@/hooks/useAppConfig";
import { useCallback } from "react";

const questionConfigMap = {
  "Personality 1": "user_quiz_personality-1",
  "Personality 2": "user_quiz_personality-2",
  "Personality 3": "user_quiz_personality-3",
};

export default function usePersonalityQuizzesPage() {
  const [questions, updateQuestions] = useUserStore((state) => [
    state.questions,
    state.updateQuestions,
  ]);
  const [userPersonalityAnswers, updateMeAnswers] = useAppQuestions((state) => [
    state.userPersonalityAnswers,
    state.updateMeAnswers,
  ]);

  const { config } = useAppConfig({});

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
    questions,
    userPersonalityAnswers,
    checkIfCompleted,
  };
}

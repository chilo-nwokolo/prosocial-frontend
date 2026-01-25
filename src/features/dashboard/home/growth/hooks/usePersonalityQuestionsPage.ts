"use client";
import { useToast } from "@chakra-ui/react";
import { appRouteLinks } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { UserQuestionsType, useAppQuestions, useUserStore } from "@/store";
import { combineIntoFormattedArray } from "@/utils/helpers";
import useAppConfig from "@/hooks/useAppConfig";
import localStorageService from "@/service/localStorage";

type Props = {
  quizId: string;
};

export default function usePersonalityQuestionsPage({ quizId }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [sectionQuestions, setSectionQuestions] = useState<
    UserQuestionsType[] | undefined
  >(undefined);
  const [questions] = useUserStore((state) => [state.questions]);
  const [userPersonalityAnswers, updateUserPersonalityAnswers, meAnswers] =
    useAppQuestions((state) => [
      state.userPersonalityAnswers,
      state.updateUserPersonalityAnswers,
      state.meAnswers,
    ]);

  const { updateConfig } = useAppConfig({});

  useEffect(() => {
    const sectionQuestions = questions?.filter(
      (question) => question.sub_category === decodeURI(quizId),
    );
    if (!sectionQuestions?.length) {
      router.back();
    }
    setSectionQuestions(sectionQuestions);
    return () => {
      setSectionQuestions(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, questions]);

  const genInitialValues = useCallback(() => {
    const result: Record<string, string> = {};
    sectionQuestions?.forEach((element) => {
      const answer = meAnswers.find((el) => el.questionId === element.id);
      result[element.id] = answer?.answerId || "";
    });
    return result;
  }, [meAnswers, sectionQuestions]);

  const formik = useFormik({
    initialValues: genInitialValues(),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);

      const location = decodeURI(quizId);
      const locationIndex = userPersonalityAnswers.findIndex(
        (answer) => answer[location],
      );

      if (locationIndex < 0) {
        updateUserPersonalityAnswers([
          ...userPersonalityAnswers,
          { [location]: Object.values(values).length },
        ]);
      } else {
        const newArray = [...userPersonalityAnswers];
        newArray.splice(locationIndex, 1, {
          [location]: Object.values(values).length,
        });
        updateUserPersonalityAnswers(newArray);
      }

      const formattedAnswers = combineIntoFormattedArray([values]);

      try {
        // Submit to localStorage
        localStorageService.submitQuestionResponses(
          formattedAnswers.map((a: any) => ({
            question_id: a.question_id,
            answer_id: a.answer_id,
          })),
        );

        if (formattedAnswers.length === 10) {
          updateConfig([
            {
              key: `user_quiz_${decodeURI(quizId)
                .replace(" ", "-")
                .toLowerCase()}`,
              value: "completed",
            },
          ]);
        }

        toast({
          title: "Saved successfully.",
          status: "success",
        });
        router.push(appRouteLinks.growthPersonality);
      } catch (error: any) {
        toast({
          status: "error",
          title: error.message || "Failed to save",
        });
      }

      setLoading(false);
    },
  });

  return { formik, router, sectionQuestions, loading } as const;
}

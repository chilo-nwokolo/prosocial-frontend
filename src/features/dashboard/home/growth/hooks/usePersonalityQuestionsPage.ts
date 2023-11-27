"use client";
import { useToast } from "@chakra-ui/react";
import { appRouteLinks } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { UserQuestionsType, useAppQuestions, useUserStore } from "@/store";
import { useMutation } from "@apollo/client";
import { QUESTION_RESPONSE_MUTATION } from "@/features/intro/gql";
import { apolloErrorHandler, combineIntoFormattedArray } from "@/utils/helpers";

type Props = {
  quizId: string;
};

export default function usePersonalityQuestionsPage({ quizId }: Props) {
  const router = useRouter();
  const toast = useToast();
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

  const [submitAnswers, { loading }] = useMutation(QUESTION_RESPONSE_MUTATION, {
    onError: (error) => {
      toast({
        status: "error",
        title: apolloErrorHandler(error),
      });
    },
    onCompleted: () => {
      toast({
        title: "Saved successfully",
        status: "success",
      });
      router.push(appRouteLinks.growthPersonality);
    },
    refetchQueries: ["QUERY_ALL_QUESTIONS"],
  });

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
      await submitAnswers({
        variables: {
          input: { answers: formattedAnswers },
        },
      });
    },
  });

  return { formik, router, sectionQuestions, loading } as const;
}

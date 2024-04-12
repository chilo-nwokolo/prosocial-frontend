import { useAppQuestions } from "@/store";
import { useMutation } from "@apollo/client";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { QUESTION_RESPONSE_MUTATION, UPDATE_USER_PROFILE } from "../gql";
import { appRouteLinks } from "@/utils/constants";
import { apolloErrorHandler, combineIntoFormattedArray } from "@/utils/helpers";

export default function useQuestionCategories() {
  const [onboardQuestions, onboardAnswers, socialPreferenceAnswers] =
    useAppQuestions((state) => [
      state.onboardQuestions,
      state.onboardAnswers,
      state.socialPreferenceAnswers,
    ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const [updateProfile] = useMutation(UPDATE_USER_PROFILE, {
    onError: (error) => {
      toast({
        status: "error",
        title: apolloErrorHandler(error),
      });
      onClose();
    },
  });

  const [submitSurvey] = useMutation(QUESTION_RESPONSE_MUTATION, {
    onError: (error) => {
      onClose();
      toast({
        status: "error",
        title: apolloErrorHandler(error),
      });
    },
    onCompleted: () => {
      onClose();
      router.push(appRouteLinks.result);
    },
  });

  const getQuestionsAnswersCount = () => {
    const answersObject = Object?.values(onboardAnswers || {}).flat();

    const questionsLength = onboardQuestions?.reduce(
      (acc: number, curr: any) => {
        return acc + curr.questions.length;
      },
      0,
    );
    const answersLength = answersObject.reduce((acc: number, curr: any) => {
      return acc + Object.keys(curr).length;
    }, 0);
    return questionsLength === answersLength;
  };

  const onSubmit = async () => {
    onOpen();
    const profileAnswers = onboardAnswers["The-basics"];

    await updateProfile({
      variables: {
        input: {
          profile: profileAnswers,
        },
      },
    });

    delete onboardAnswers["The-basics"];

    const allAnswers = Object.values(onboardAnswers).flat() as any;

    const formattedAnswers = combineIntoFormattedArray(allAnswers);

    await submitSurvey({
      variables: {
        input: {
          answers: formattedAnswers,
        },
      },
    });
  };

  const calculateSocialPreferenceAnswers = () => {
    const singleKeys = ["4", "5", "6", "7", "18"];
    let counted1 = false;
    let counted2 = false;

    let count = 0;

    for (let key in socialPreferenceAnswers) {
      if (singleKeys.includes(key)) {
        if (socialPreferenceAnswers[key].length) {
          count += 1;
        }
      }
      if (
        !counted1 &&
        socialPreferenceAnswers["8"].length &&
        socialPreferenceAnswers["9"].length &&
        socialPreferenceAnswers["10"].length
      ) {
        counted1 = true;
        count += 1;
      }
      if (
        !counted2 &&
        socialPreferenceAnswers["12"].length &&
        socialPreferenceAnswers["13"].length &&
        socialPreferenceAnswers["14"].length
      ) {
        counted2 = true;
        count += 1;
      }
    }

    return `${count} / 7`;
  };

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

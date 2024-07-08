import { useAppQuestions, useConfig } from "@/store";
import { useMutation } from "@apollo/client";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { QUESTION_RESPONSE_MUTATION, UPDATE_USER_PROFILE } from "../gql";
import { appRouteLinks, configExtras } from "@/utils/constants";
import { apolloErrorHandler, combineIntoFormattedArray } from "@/utils/helpers";
import { useMemo } from "react";

export default function useQuestionCategories() {
  const [
    submittedInterests,
    submittedPreferences,
    onboardQuestions,
    onboardAnswers,
    socialPreferenceAnswers,
    updateSubmittedQuestions,
    updateSubmittedPreferences,
  ] = useAppQuestions((state) => [
    state.submittedInterests,
    state.submittedPreferences,
    state.onboardQuestions,
    state.onboardAnswers,
    state.socialPreferenceAnswers,
    state.updateSubmittedQuestions,
    state.updateSubmittedPreferences,
  ]);
  const [config] = useConfig((state) => [state.config]);

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

  const getQuestionsAnswersCount = useMemo(() => {
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

    const result = questionsLength === answersLength;

    if (result) {
      updateSubmittedQuestions(true);
    }

    return result;
  }, [onboardAnswers, onboardQuestions, updateSubmittedQuestions]);

  const onSubmit = async () => {
    if (!submittedPreferences) {
      toast({
        status: "error",
        description: "Please, complete the social preferences section",
      });
      return;
    }
    if (!submittedInterests) {
      toast({
        status: "error",
        description: "Please, complete the interests section",
      });
      return;
    }
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

  const calculateSocialPreferenceAnswers = useMemo(() => {
    const singleKeys = ["4", "5", "6", "7", "18"];
    let counted1 = false;
    let counted2 = false;

    let count = 0;

    if (!config[configExtras.user_has_filled_social_preferences]) {
      return `${count} / 4`;
    }

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

    if (!socialPreferenceAnswers["18"]) {
      count += 1;
    }

    if (config[configExtras.user_has_uploaded_profile_picture]) {
      count += 1;
    }

    if (count >= 7) {
      updateSubmittedPreferences(true);
    }

    return `${count} / 4`;
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

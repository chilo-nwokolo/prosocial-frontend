"use client";
import { Center, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  AccessToken,
  appRouteLinks,
  configExtras,
  userType,
} from "@/utils/constants";
import { useLazyQuery } from "@apollo/client";
import { QUERY_QUESTIONS } from "@/features/intro/gql";
import { useAppQuestions, useUserStore } from "@/store";
import { transformQuestions } from "@/features/intro/helpers";
import { apolloErrorHandler } from "@/utils/helpers";
import { deleteCookie, getCookie } from "@/libs/cookies";
import useAppConfig from "@/hooks/useAppConfig";
import { QUERY_USER_SOCIAL_PREFERENCE } from "@/app/pro/(onboarding)/intro/social-preferences/graphql/gql";
import { convertSocialPrefResponseToInitialValues } from "@/app/pro/(onboarding)/intro/social-preferences/helpers";
import { useMemo } from "react";
import { Login_UserMutation, RegisterMutation } from "@/__generated__/graphql";

export default function OnboardingPage() {
  const router = useRouter();

  useAppConfig({
    onQuerySuccess: (settings) => {
      if (settings?.[configExtras.user_has_seen_personality_score]) {
        router.push(appRouteLinks.home);
      } else {
        const userRole = getCookie(userType);
        if (userRole === "admin") {
          router.push(appRouteLinks.logout);
        } else {
          getQuestions();
          getSocialPreferences();
        }
      }
    },
  });

  const [
    updateOnboardQuestions,
    // updateOnboardAnswers,
    updateSocialPreferenceAnswers,
    updateSocialPreferenceReferrees,
  ] = useAppQuestions((state) => [
    state.updateOnboardQuestions,
    // state.updateOnboardAnswers,
    state.updateSocialPreferenceAnswers,
    state.updateSocialPreferenceReferrees,
  ]);
  const [userData] = useUserStore((state) => [state.user]);

  const toast = useToast();
  const userId = useMemo(() => {
    return (
      (userData as RegisterMutation)?.register?.user?.id ||
      (userData as Login_UserMutation)?.login?.user?.id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [getSocialPreferences, { loading: loadingUser }] = useLazyQuery(
    QUERY_USER_SOCIAL_PREFERENCE,
    {
      variables: {
        id: userId,
      },
      onCompleted: (response) => {
        const { result, referrals } =
          convertSocialPrefResponseToInitialValues(response);
        updateSocialPreferenceAnswers(result);
        updateSocialPreferenceReferrees(referrals);
      },
    },
  );

  const [getQuestions, { loading }] = useLazyQuery(QUERY_QUESTIONS, {
    onCompleted: (data) => {
      const result = transformQuestions(data);
      updateOnboardQuestions(result);
      // localStorage.clear();
      setTimeout(() => {
        router.push(appRouteLinks.intro);
      }, 1000);
    },
    onError: (error) => {
      toast({
        title: apolloErrorHandler(error),
        status: "error",
      });
      deleteCookie(AccessToken);
    },
  });

  return (
    <Center h="100vh">
      <Flex flexDir="column" alignItems="center" gap="5">
        <Spinner size="xl" />
        <Text fontSize="xl" fontWeight="medium" textAlign="center">
          {loading || loadingUser ? "Logging in..." : "fetching data..."}
        </Text>
      </Flex>
    </Center>
  );
}

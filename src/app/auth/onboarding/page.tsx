"use client";
import { Center, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  AccessToken,
  appRouteLinks,
  configExtras,
  userType,
} from "@/utils/constants";
import { useAppQuestions, useUserStore } from "@/store";
import { transformQuestions } from "@/features/intro/helpers";
import { deleteCookie, getCookie } from "@/libs/cookies";
import useAppConfig from "@/hooks/useAppConfig";
import { convertSocialPrefResponseToInitialValues } from "@/app/pro/(onboarding)/intro/social-preferences/helpers";
import { useMemo, useState } from "react";
import { Login_UserMutation, RegisterMutation } from "@/__generated__/graphql";
import localStorageService from "@/service/localStorage";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const [
    updateOnboardQuestions,
    updateSocialPreferenceAnswers,
    updateSocialPreferenceReferrees,
  ] = useAppQuestions((state) => [
    state.updateOnboardQuestions,
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

  const getSocialPreferences = () => {
    setLoadingUser(true);
    const socialPreferences = localStorageService.getUserSocialPreferences();
    if (socialPreferences.length) {
      const response = {
        user: {
          id: userId,
          name: "",
          social_preference_answers: socialPreferences,
        },
      };
      const { result, referrals } =
        convertSocialPrefResponseToInitialValues(response);
      updateSocialPreferenceAnswers(result);
      updateSocialPreferenceReferrees(referrals);
    }
    setLoadingUser(false);
  };

  const getQuestions = () => {
    setLoading(true);
    try {
      const categories =
        localStorageService.getOnboardCategoriesWithQuestions();
      const data = { onBoardCategoriesWithQuestions: categories } as any;
      const result = transformQuestions(data);
      updateOnboardQuestions(result);
      setTimeout(() => {
        router.push(appRouteLinks.intro);
      }, 1000);
    } catch (error: any) {
      toast({
        title: error.message || "Failed to load questions",
        status: "error",
      });
      deleteCookie(AccessToken);
    }
    setLoading(false);
  };

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

"use client";
import { Center, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AccessToken, appRouteLinks, configExtras } from "@/utils/constants";
import { useLazyQuery } from "@apollo/client";
import { QUERY_QUESTIONS } from "@/features/intro/gql";
import { useAppQuestions } from "@/store";
import { transformQuestions } from "@/features/intro/helpers";
import { apolloErrorHandler } from "@/utils/helpers";
import { deleteCookie } from "@/libs/cookies";
import useAppConfig from "@/hooks/useAppConfig";

export default function OnboardingPage() {
  const router = useRouter();

  useAppConfig({
    onSuccess: (settings) => {
      if (settings?.[configExtras.user_has_seen_personality_score]) {
        router.push(appRouteLinks.home);
      } else {
        getQuestions();
      }
    },
  });

  const [updateOnboardQuestions] = useAppQuestions((state) => [
    state.updateOnboardQuestions,
  ]);

  const toast = useToast();

  const [getQuestions, { loading }] = useLazyQuery(QUERY_QUESTIONS, {
    onCompleted: (data) => {
      const result = transformQuestions(data);
      updateOnboardQuestions(result);
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
          {loading ? "Logging in..." : "fetching data..."}
        </Text>
      </Flex>
    </Center>
  );
}

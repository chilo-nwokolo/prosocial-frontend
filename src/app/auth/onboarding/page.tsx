"use client";

import { Center, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AccessToken, appRouteLinks, configExtras } from "@/utils/constants";
import { useQuery } from "@apollo/client";
import { QUERY_QUESTIONS } from "@/features/intro/gql";
import { useAppQuestions } from "@/store";
import { transformQuestions } from "@/features/intro/helpers";
import { apolloErrorHandler } from "@/utils/helpers";
import { deleteCookie } from "@/libs/cookies";
import { useLayoutEffect, useState } from "react";
import useAppConfig from "@/hooks/useAppConfig";

export default function OnboardingPage() {
  const router = useRouter();

  const { config } = useAppConfig({});

  const [updateOnboardQuestions] = useAppQuestions((state) => [
    state.updateOnboardQuestions,
  ]);

  const toast = useToast();

  const [skipQuery, setSkipQuery] = useState(false);

  const { loading, refetch } = useQuery(QUERY_QUESTIONS, {
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
    skip: skipQuery,
  });

  useLayoutEffect(() => {
    if (config?.[configExtras.user_has_seen_personality_score]) {
      router.push(appRouteLinks.home);
      setSkipQuery(true);
    } else {
      refetch();
    }
  }, [config, refetch, router]);

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

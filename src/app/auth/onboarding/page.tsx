"use client";

import { useEffect } from "react";
import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { appRouteLinks } from "@/utils/constants";

export default function OnboardingPage() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push(appRouteLinks.intro);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center h="100vh">
      <Flex flexDir="column" alignItems="center" gap="5">
        <Spinner size="xl" />
        <Text fontSize="xl" fontWeight="medium" textAlign="center">Logging in...</Text>
      </Flex>
    </Center>
  )
}
"use client";
import { useEffect } from "react";
import { deleteCookie } from "@/libs/cookies";
import { AccessToken, appRouteLinks } from "@/utils/constants";
import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    deleteCookie(AccessToken);
    router.push(appRouteLinks.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center h="100vh">
      <Flex flexDir="column" alignItems="center" gap="5">
        <Spinner size="xl" />
        <Text fontSize="xl" fontWeight="medium" textAlign="center">
          Logging out...
        </Text>
      </Flex>
    </Center>
  );
}

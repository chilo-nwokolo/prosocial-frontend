"use client";

import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { ImageLinks, appRouteLinks } from "@/utils/constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // if (getCookie(configExtras.user_visited_intro_page)) {
      //   router.push(appRouteLinks.login);
      //   return;
      // }
      router.push(appRouteLinks.welcome);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <Center h="100vh" p="10">
      <Flex flexDir="column" justifyContent="center">
        <Image
          src={ImageLinks.logo}
          alt="prosocial logo"
          w="200px"
          h="200px"
          objectFit="contain"
        />
        <Text textAlign="center" fontSize="4xl" fontWeight="extrabold" fontFamily="var(--font-comfortaa)">
          ProSocial
        </Text>
      </Flex>
    </Center>
  );
}

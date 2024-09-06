"use client";
import useAppConfig from "@/hooks/useAppConfig";
import { configExtras } from "@/utils/constants";
import { Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const QuestionCategories = dynamic(
  () => import("@/features/intro/components/QuestionCategories"),
  { ssr: false },
);

export default function IntroPage() {
  useAppConfig({
    initialConfig: [
      { key: configExtras.user_visited_intro_page, value: "true" },
      { key: configExtras.user_accepted_terms_and_conditions, value: "true" },
    ],
  });

  return (
    <Flex mt="5" flexDir="column">
      <Text mb="4" fontSize="2xl" fontWeight="600" as="h1">
        About You
      </Text>
      <Text>
        Answering these questions will help us match you with people we think
        you&apos;ll like. When you finish, we&apos;ll tell you about some of the
        qualities that make you a great friend!
      </Text>
      <QuestionCategories />
    </Flex>
  );
}

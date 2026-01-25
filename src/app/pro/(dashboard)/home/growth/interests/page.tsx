"use client";
import BackButton from "@/components/General/BackButton";
import QueryContainer from "@/components/General/QueryContainer";
import { useUserStore } from "@/store";
import { appRouteLinks } from "@/utils/constants";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

export default function InterestsPage() {
  const router = useRouter();
  const [setPersonalityType] = useUserStore((state) => [
    state.setPersonalityType,
  ]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);

  useEffect(() => {
    // Load interests by traits
    localStorageService.getInterestsByTrait();

    // Load personality score
    const score = localStorageService.getPersonalityScore();
    if (score?.personalityBucketType) {
      setPersonalityType({
        name: score.personalityBucketType.name || "",
        subTitle: score.personalityBucketType.sub_title || "",
      });
    }

    setLoading(false);
  }, [setPersonalityType]);

  return (
    <QueryContainer loading={loading} error={error}>
      <Center h="80vh">
        <Flex flexDir="column" w="full" h="full" gap="5">
          <BackButton destination={appRouteLinks.growth} />
          <Flex flexDir="column" h="full" justifyContent="center" gap="4">
            <Text fontSize="2xl" fontWeight="semibold">
              Interests Inventory
            </Text>
            <Text mt="2">
              In this exercise, we&apos;ll show you pairs of photos. Choose
              whcih one you like more. This will help us match your interests
              with others who enjoy similar types of activities.
            </Text>
          </Flex>
          <Button
            mt="auto"
            onClick={() => {
              router.push(`${appRouteLinks.interestsExpandedMore}`);
            }}
          >
            Begin
          </Button>
        </Flex>
      </Center>
    </QueryContainer>
  );
}

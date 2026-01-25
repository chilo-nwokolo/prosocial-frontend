"use client";
import { Flex, Text } from "@chakra-ui/react";
import GrowthLayoutWrapper from "@/features/dashboard/home/growth/components/GrowthLayoutWrapper";
import { appRouteLinks, configExtras } from "@/utils/constants";
import Link from "next/link";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
import QueryContainer from "@/components/General/QueryContainer";
import useAppConfig from "@/hooks/useAppConfig";
import { useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

export default function ChallengesPage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  const [challengeCategories, setChallengeCategories] = useState<any[]>([]);
  const { config } = useAppConfig({});

  useEffect(() => {
    const categories = localStorageService.getChallengeCategories();
    setChallengeCategories(categories);
    setLoading(false);
  }, []);

  return (
    <QueryContainer loading={loading} error={error}>
      <GrowthLayoutWrapper
        title="Challenges"
        description="Below are a series of personal challenges. We recommend one challenge per day.
				After you have completed the challenge, you will be prompted to journal about
				your experiences."
        destination={appRouteLinks.growth}
      >
        <Flex flexDir="column" gap="5" mt="4">
          {challengeCategories?.map((challenge, i) => (
            <Link
              href={`${appRouteLinks.growthChallenges}/${challenge.id}`}
              key={challenge.id}
            >
              <Flex
                w="full"
                border="1px solid"
                borderRadius="lg"
                px="5"
                py="8"
                borderColor="black"
                flexDir="column"
                gap="3"
              >
                <Flex
                  w="full"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontSize="xl" w="56" fontWeight="medium">
                    {i + 1}: {challenge.title}
                  </Text>
                  <Text>
                    <FaChevronRight />
                  </Text>
                </Flex>
                {config?.[configExtras.user_challenges_story]?.includes(
                  challenge?.title?.trim(),
                ) ? (
                  <Flex color="green.500" gap="2" alignItems="center">
                    <FaCheckCircle />
                    <Text fontWeight="semibold">Completed</Text>
                  </Flex>
                ) : null}
              </Flex>
            </Link>
          ))}
        </Flex>
      </GrowthLayoutWrapper>
    </QueryContainer>
  );
}

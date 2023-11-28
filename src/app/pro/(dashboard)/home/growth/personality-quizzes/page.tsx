"use client";
import { Flex, Text } from "@chakra-ui/react";
import QueryContainer from "@/components/General/QueryContainer";
import usePersonalityQuizzesPage from "@/features/dashboard/hooks/usePersonalityQuizzesPage";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { appRouteLinks } from "@/utils/constants";
import GrowthLayoutWrapper from "@/features/dashboard/home/growth/components/GrowthLayoutWrapper";

const questionCategories = ["Personality 1", "Personality 2", "Personality 3"];

export default function PersonalityQuizzesPage() {
  const { error, loading, checkIfCompleted } = usePersonalityQuizzesPage();

  return (
    <QueryContainer loading={loading} error={error}>
      <GrowthLayoutWrapper
        title="Quizzes"
        description="	Below are three quizzes that will help us get to know you better. By answering
						these questions, you will receive more feedback on your personality and we
						will be able to better match you with potential"
        destination={appRouteLinks.growth}
      >
        <Flex mt="5" flexDir="column" gap="4">
          {questionCategories.map((question) => (
            <Link
              href={`${appRouteLinks.growthPersonality}/${question}`}
              key={question}
            >
              <Flex
                w="full"
                border="1px solid"
                borderRadius="lg"
                px="5"
                py="10"
                borderColor="black"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex flexDir="column" gap="3">
                  <Text fontSize="lg" fontWeight="semibold">
                    {question}
                  </Text>
                  {checkIfCompleted(question) ? (
                    <Flex color="green.500" gap="2" alignItems="center">
                      <FaCheckCircle />
                      <Text fontWeight="semibold">Completed</Text>
                    </Flex>
                  ) : (
                    <Text>10 questions</Text>
                  )}
                </Flex>
                <Text>
                  <FaChevronRight />
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </GrowthLayoutWrapper>
    </QueryContainer>
  );
}

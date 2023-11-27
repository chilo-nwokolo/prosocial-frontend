"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { appRouteLinks } from "@/utils/constants";
import LoadingModal from "@/components/General/LoadingModal";
import useQuestionCategories from "../hooks/useQuestionCategories";

export default function QuestionCategories() {
  const {
    isOpen,
    onboardQuestions,
    onSubmit,
    onClose,
    onboardAnswers,
    getQuestionsAnswersCount,
  } = useQuestionCategories();

  return (
    <>
      <Flex flexDir="column">
        <Flex flexDir="column" gap="8" mt="10">
          {onboardQuestions?.map((question: any) => (
            <Link
              key={question.id}
              href={`${appRouteLinks.intro}/${question.category}`}
            >
              <Flex
                border="1px solid"
                alignItems="center"
                borderColor="gray.400"
                py="16"
                px="5"
                borderRadius="lg"
                cursor="pointer"
              >
                <Flex flexDir="column" gap="2">
                  <Text fontWeight="semibold" fontSize="lg">
                    {question.category}
                  </Text>
                  <Text>
                    {
                      Object.values(
                        onboardAnswers?.[
                          question.category.replaceAll(" ", "-")
                        ] || "",
                      )?.length
                    }
                    /{question.totalQuestions}
                  </Text>
                </Flex>
                <Text ml="auto">
                  <FaChevronRight />
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
        <Button
          mt="10"
          isDisabled={!getQuestionsAnswersCount()}
          onClick={onSubmit}
        >
          View Results
        </Button>
      </Flex>
      <LoadingModal
        isOpen={isOpen}
        onClose={onClose}
        loadingText="Submitting..."
      />
    </>
  );
}

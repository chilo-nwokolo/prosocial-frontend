"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { appRouteLinks } from "@/utils/constants";
import LoadingModal from "@/components/General/LoadingModal";
import useQuestionCategories from "../hooks/useQuestionCategories";

const socialPrefererences = {
  category: "Social preferences",
  totalQuestions: 7,
  destination: "/social-preferences",
};
const interests = {
  category: "Interests",
  totalQuestions: null,
  destination: "/interests",
};

export default function QuestionCategories() {
  const {
    isOpen,
    onboardQuestions,
    onSubmit,
    onClose,
    onboardAnswers,
    getQuestionsAnswersCount,
    calculateSocialPreferenceAnswers,
  } = useQuestionCategories();

  return (
    <>
      <Flex flexDir="column">
        <Flex flexDir="column" gap="8" mt="10">
          {onboardQuestions?.map((question: any) => (
            <QuestionCategoryLinkBox
              question={question}
              onboardAnswers={onboardAnswers}
              key={question.id}
            />
          ))}
          {/* SOCIAL PREFERENCES */}
          <OtherQuestionCategoryLinkBox
            question={socialPrefererences}
            calculateRemainder={calculateSocialPreferenceAnswers()}
          />
          {/* INTERESTS */}
          <OtherQuestionCategoryLinkBox
            question={interests}
            calculateRemainder={onboardAnswers}
          />
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

const QuestionCategoryLinkBox = ({
  question,
  onboardAnswers,
}: {
  question: any;
  onboardAnswers: any;
}) => {
  return (
    <Link href={`${appRouteLinks.intro}/${question.destination}`}>
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
          {question.totalQuestions ? (
            <Text>
              {
                Object.values(
                  onboardAnswers?.[question.category.replaceAll(" ", "-")] ||
                    "",
                )?.length
              }
              /{question.totalQuestions}
            </Text>
          ) : null}
        </Flex>
        <Text ml="auto">
          <FaChevronRight />
        </Text>
      </Flex>
    </Link>
  );
};

const OtherQuestionCategoryLinkBox = ({
  question,
  calculateRemainder,
}: {
  question: any;
  calculateRemainder: any;
}) => {
  return (
    <Link href={`${appRouteLinks.intro}/${question.destination}`}>
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
          {calculateRemainder}
        </Flex>
        <Text ml="auto">
          <FaChevronRight />
        </Text>
      </Flex>
    </Link>
  );
};

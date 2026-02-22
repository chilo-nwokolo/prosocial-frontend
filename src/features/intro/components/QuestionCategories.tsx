"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { appRouteLinks } from "@/utils/constants";
import LoadingModal from "@/components/General/LoadingModal";
import useQuestionCategories from "../hooks/useQuestionCategories";
import { useAppQuestions } from "@/store";
import { transformQuestions } from "../helpers";
import localStorageService from "@/service/localStorage";
import { useEffect } from "react";

const socialPrefererences = {
  category: "Social preferences",
  totalQuestions: 5,
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
    calculateSocialPreferenceAnswers,
  } = useQuestionCategories();

  const updateOnboardQuestions = useAppQuestions(
    (state) => state.updateOnboardQuestions,
  );

  useEffect(() => {
    if (!onboardQuestions || onboardQuestions.length === 0) {
      const categories =
        localStorageService.getOnboardCategoriesWithQuestions();
      if (categories.length) {
        const data = { onBoardCategoriesWithQuestions: categories } as any;
        const result = transformQuestions(data);
        updateOnboardQuestions(result);
      }
    }
  }, [onboardQuestions, updateOnboardQuestions]);

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
            calculateRemainder={calculateSocialPreferenceAnswers}
          />
          {/* INTERESTS */}
          <OtherQuestionCategoryLinkBox
            question={interests}
            calculateRemainder={null}
          />
        </Flex>
        <Button mt="10" onClick={onSubmit}>
          View results
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
        borderColor="black"
        backgroundColor="#fff"
        py="16"
        px="5"
        borderRadius="0"
        cursor="pointer"
        boxShadow="3px 3px 3px 0px #CECDCD"
      >
        <Flex flexDir="column" gap="2">
          <Text
            fontWeight="600"
            fontSize="2xl"
            fontFamily="var(--font-comfortaa)"
          >
            {question.category}
          </Text>
          {question.totalQuestions ? (
            <Text>
              {
                Object.entries(
                  onboardAnswers?.[question.category.replaceAll(" ", "-")] ||
                    "",
                )?.filter(([key]) => key !== "additional_political_orientation")
                  ?.length
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
        borderColor="black"
        py="16"
        px="5"
        borderRadius="0"
        cursor="pointer"
        backgroundColor="#fff"
        boxShadow="3px 3px 3px 0px #CECDCD"
      >
        <Flex flexDir="column" gap="2">
          <Text
            fontWeight="600"
            fontSize="2xl"
            fontFamily="var(--font-comfortaa)"
          >
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

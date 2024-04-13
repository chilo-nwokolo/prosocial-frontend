"use client";
import { Interest } from "@/__generated__/graphql";
import BackButton from "@/components/General/BackButton";
import { QUERY_INTERESTS_BY_TRAITS } from "@/features/dashboard/home/growth/queries";
import { client } from "@/service";
import { useAppQuestions } from "@/store";
import { ImageLinks, appRouteLinks } from "@/utils/constants";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { GrClose } from "react-icons/gr";

export default function InterestsPairComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const questionId = searchParams.get("question");
  const [interestsAnswer, updateInterestsAnswer] = useAppQuestions((state) => [
    state.interestsAnswer,
    state.updateInterestsAnswer,
  ]);

  const result = client.readQuery({
    query: QUERY_INTERESTS_BY_TRAITS,
  });

  if (!questionId) {
    router.back();
  }

  if (!result?.interestsByTrait?.length) {
    router.back();
  }

  const queryResult = result?.interestsByTrait!;

  const activeInterest = queryResult?.[parseInt(questionId as string) - 1];

  const selectInterest = (question: Interest) => {
    // updateInterestsAnswer([])
    // return;
    const foundIndex = interestsAnswer.findIndex(
      (interest) => question.id === interest.interest_id,
    );

    if (foundIndex < 0) {
      updateInterestsAnswer([
        ...interestsAnswer,
        {
          response: question.title as string,
          interest_id: question.id as string,
        },
      ]);
    } else if (foundIndex >= 0) {
      const result = [...interestsAnswer];
      result.splice(foundIndex, 1, {
        response: question.title as string,
        interest_id: question.id as string,
      });
      updateInterestsAnswer(result);
    }

    if (queryResult.length === parseInt(questionId as string)) {
      router.push(appRouteLinks.interestsExpanded);
      return;
    }
    router.push(
      `${appRouteLinks.interestsPair}?question=${
        parseInt(questionId as string) + 1
      }`,
    );
  };

  return (
    <Flex flexDir="column">
      <Flex justifyContent="flex-end">
        <BackButton
          icon={<GrClose />}
          destination={appRouteLinks.growthInterests}
        />
      </Flex>
      <Text my="2">{questionId}/6</Text>
      <Text fontSize="2xl" fontWeight="semibold">
        Which do you like more?
      </Text>
      <Flex flexDir="column" px="24" mt="8" gap="10">
        {activeInterest?.interests?.map((question) => (
          <Flex
            flexDir="column"
            border="1px solid"
            height="300px"
            cursor="pointer"
            key={question.id}
            onClick={() => selectInterest(question)}
          >
            <Box height="250px" overflow="hidden">
              <Image
                src={question?.image_url || ImageLinks.logo}
                objectFit="cover"
                height={250}
                fetchPriority="high"
                alt={`image indicating ${question.title}`}
              />
            </Box>
            <Flex
              justifyContent="center"
              alignItems="center"
              height="50px"
              borderTop="1px solid"
              borderColor="black"
            >
              <Text textAlign="center">{question.title}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      {questionId && parseInt(questionId) > 1 ? (
        <Button
          mt="10"
          onClick={() =>
            router.push(
              `${appRouteLinks.interestsPair}?question=${
                parseInt(questionId as string) - 1
              }`,
            )
          }
        >
          Previous
        </Button>
      ) : null}
    </Flex>
  );
}

"use client";
import AppModal from "@/components/AppModal";
import BackButton from "@/components/General/BackButton";
import LoadingModal from "@/components/General/LoadingModal";
import QueryContainer from "@/components/General/QueryContainer";
import InterestsAccordion from "@/features/dashboard/home/growth/components/InterestsAccordion";
import InterestsSwitch from "@/features/dashboard/home/growth/components/InterestsSwitch";
import {
  QUERY_INTERESTS_BY_NONE_TRAITS,
  QUERY_ME_INTERESTS,
  SUBMIT_USER_INTERESTS,
} from "@/features/dashboard/home/growth/queries";
import { QUERY_ME_PERSONALITY_SCORE } from "@/features/intro/gql";
import useAppConfig from "@/hooks/useAppConfig";
import { client } from "@/service";
import { useAppQuestions, useUserStore } from "@/store";
import { appRouteLinks, configExtras } from "@/utils/constants";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

export default function InterestedExtendedPage() {
  const { updateConfig } = useAppConfig({});

  const [personalityType] = useUserStore((state) => [state.personalityType]);

  const [changedPersonality, setChangedPersonality] = useState(false);

  const {
    onOpen: openPersonalityModal,
    onClose: closePersonalityModal,
    isOpen: isPersonalityModalOpen,
  } = useDisclosure();

  const [
    queryPersonalityScore,
    { data: personalityScore, loading: loadingPersonalityScore },
  ] = useLazyQuery(QUERY_ME_PERSONALITY_SCORE, {
    onCompleted: (data) => {
      if (
        personalityType?.name ===
        data.me?.personalityScore?.personalityBucketType?.name
      ) {
        setChangedPersonality(false);
      } else {
        setChangedPersonality(true);
      }
      openPersonalityModal();
    },
  });

  const [flattenedInterests, setFlattenedInterets] = useState<string[] | null>(
    null,
  );

  const [key, setKey] = useState(1);

  const [interestsAnswer, updateInterestsAnswer] = useAppQuestions((state) => [
    state.interestsAnswer,
    state.updateInterestsAnswer,
  ]);

  const {
    data: result,
    loading: isLoading,
    error,
  } = useQuery(QUERY_INTERESTS_BY_NONE_TRAITS);

  const { loading: loadingInterests } = useQuery(QUERY_ME_INTERESTS, {
    onCompleted: (data) => {
      const interests: string[] = [];
      if (data.me?.interests?.length) {
        data.me?.interests?.forEach((interest) => {
          interests.push("" + interest.title);
        });
        setFlattenedInterets(interests);
        setKey(key + 1);
        return;
      }
      setFlattenedInterets([]);
    },
  });

  const toast = useToast();
  const router = useRouter();

  const [mutate, { loading }] = useMutation(SUBMIT_USER_INTERESTS, {
    variables: {
      input: {
        inputs: interestsAnswer,
      },
    },
    onError: () => {
      toast({
        status: "error",
        title: "Unable to save interests. Please try again.",
      });
    },
    onCompleted: async () => {
      toast({
        status: "success",
        title: "Interests updated successfully",
      });
      await client.refetchQueries({
        include: ["QUERY_INTERESTS_BY_NONE_TRAITS"],
      });
      updateConfig([
        { key: configExtras.user_completed_interests_2, value: "true" },
      ]);
      queryPersonalityScore();
    },
  });

  const onChange = (value: string, id: string) => {
    const foundIndex = interestsAnswer.findIndex(
      (interest) => interest.interest_id === id,
    );

    if (foundIndex < 0 && !flattenedInterests?.includes(value)) {
      updateInterestsAnswer([
        ...interestsAnswer,
        { response: value, interest_id: id },
      ]);
    } else if (foundIndex >= 0 || flattenedInterests?.includes(value)) {
      const result = [...interestsAnswer];
      result.splice(foundIndex, 1);
      updateInterestsAnswer(result);
    }
  };

  return (
    <QueryContainer loading={isLoading || loadingInterests} error={error}>
      <Flex flexDir="column">
        <Flex justifyContent="flex-end">
          <BackButton
            icon={<GrClose />}
            destination={appRouteLinks.interestsExpaned}
          />
        </Flex>
        <Text fontWeight="lg" fontSize="2xl">
          What are your interests
        </Text>
        <Flex flexDir="column" mt="4">
          {result?.interestsByNoneTrait?.length ? (
            result?.interestsByNoneTrait?.map((trait) => (
              <InterestsAccordion
                key={"" + trait.id + key}
                title={trait.title as string}
                id={trait.id as string}
                onChange={onChange}
                defaultIndex={
                  flattenedInterests?.includes("" + trait.title) ? [0] : []
                }
              >
                <Flex flexDir="column">
                  <RadioGroup>
                    <Stack>
                      {trait?.interests?.map((interest, i) => (
                        <Flex
                          key={interest.id}
                          p="3"
                          bg={i % 2 === 0 ? "#f4ede2" : "transparent"}
                        >
                          <InterestsSwitch
                            isChecked={flattenedInterests?.includes(
                              interest.title as string,
                            )}
                            interest={interest}
                            onChange={onChange}
                          />
                        </Flex>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Flex>
              </InterestsAccordion>
            ))
          ) : (
            <Flex flexDir="column" alignItems="center" gap="4" mt="4">
              <Text>
                Sorry we were unable to fetch this data. Kindly click on the Go
                Back button and click on Begin to try again.
              </Text>
              <BackButton text="Go Back" />
            </Flex>
          )}
        </Flex>
        <Button isLoading={loading} onClick={() => mutate()} mt="10">
          Done
        </Button>
      </Flex>
      <LoadingModal isOpen={loadingPersonalityScore} onClose={() => {}} />
      <AppModal
        title="Your personality type"
        description={
          <Text textAlign="center">
            Based on your answers to these additional questions, your ProSocial
            personality type is{" "}
            {changedPersonality ? (
              personalityScore?.me?.personalityScore?.personalityBucketType
                ?.name
            ) : (
              <Box as="span" gap="1">
                still{" "}
                <Text
                  textDecor="underline"
                  color="blue"
                  onClick={() =>
                    router.push(appRouteLinks.profilePersonalityResult)
                  }
                  cursor="pointer"
                >
                  the{" "}
                  {
                    personalityScore?.me?.personalityScore
                      ?.personalityBucketType?.name
                  }
                </Text>
              </Box>
            )}
          </Text>
        }
        isOpen={isPersonalityModalOpen}
        onClose={closePersonalityModal}
        actionButtons={
          <Button onClick={() => router.push(appRouteLinks.growth)}>
            Done
          </Button>
        }
      />
    </QueryContainer>
  );
}

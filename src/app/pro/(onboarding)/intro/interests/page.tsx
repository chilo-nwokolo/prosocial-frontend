"use client";
import {
  InputMaybe,
  SubmitUserInterestInput,
  TopInterestEnum,
} from "@/__generated__/graphql";
import BackButton from "@/components/General/BackButton";
import QueryContainer from "@/components/General/QueryContainer";
import InterestsAccordion from "@/features/dashboard/home/growth/components/InterestsAccordion";
import InterestsSwitch from "@/features/dashboard/home/growth/components/InterestsSwitch";
import useAppConfig from "@/hooks/useAppConfig";
import { useAppQuestions } from "@/store";
import { appRouteLinks, configExtras } from "@/utils/constants";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import localStorageService from "@/service/localStorage";

export default function InterestedExtendedPage() {
  const { updateConfig } = useAppConfig({});

  const [flattenedInterests, setFlattenedInterets] = useState<string[] | null>(
    null,
  );
  const [newInterest, setNewInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingInterest, setCreatingInterest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingInterests, setLoadingInterests] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const router = useRouter();

  const [key, setKey] = useState(1);

  const [interestsAnswer, updateInterestsAnswer, updateSubmittedInterests] =
    useAppQuestions((state) => [
      state.interestsAnswer,
      state.updateInterestsAnswer,
      state.updateSubmittedInterests,
    ]);

  useEffect(() => {
    // Load interests by non-trait
    const interests = localStorageService.getInterestsByNonTrait();
    setData({ interestsByNoneTrait: interests });
    setIsLoading(false);
  }, []);

  const result = useMemo(() => {
    return {
      ...data,
      interestsByNoneTrait: [...(data?.interestsByNoneTrait ?? [])].sort(
        (a: any, b: any) => {
          if (a.title && b.title) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
          }
          return 0;
        },
      ),
    };
  }, [data]);

  useEffect(() => {
    // Load user's interests
    const userInterests = localStorageService.getUserInterests();
    const interests: string[] = [];
    if (userInterests.length) {
      userInterests.forEach((interest) => {
        interests.push("" + interest.title);
      });
      setFlattenedInterets(interests);
      updateInterestsAnswer(
        userInterests.map((interest) => ({
          interest_id: interest.id as string,
          response: interest.title as string,
        })),
      );
      setKey(key + 1);
    } else {
      setFlattenedInterets([]);
    }
    setLoadingInterests(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toast = useToast();

  const onChange = (value: string, id: string) => {
    const foundIndex = interestsAnswer.findIndex(
      (interest) => interest.interest_id === id,
    );

    if (foundIndex < 0 && !flattenedInterests?.includes(value)) {
      const updatedInterests = [{ response: value, interest_id: id }];
      updateInterestsAnswer(updatedInterests);

      setFlattenedInterets(
        updatedInterests?.map((interest) => interest.response),
      );
    } else if (foundIndex >= 0 || flattenedInterests?.includes(value)) {
      const result = [...interestsAnswer];
      result.splice(foundIndex, 1);
      updateInterestsAnswer(result);
      setFlattenedInterets(result.map((interest) => interest.response));
    }
  };

  const handleInterestsSubmit = async () => {
    setLoading(true);

    let interests: SubmitUserInterestInput[] = [...interestsAnswer];

    if (newInterest) {
      setCreatingInterest(true);
      try {
        const createdInterest = localStorageService.createInterest({
          title: newInterest,
          image_url: "",
        });
        interests = [
          ...interests,
          {
            response: createdInterest.title || "",
            interest_id: createdInterest.id || "",
            is_top_interest: "NO" as InputMaybe<TopInterestEnum>,
          },
        ];
      } catch (error) {
        toast({
          status: "error",
          title: "Unable to create your interests. Please try again.",
        });
      }
      setCreatingInterest(false);
    }

    updateInterestsAnswer(interests);

    try {
      localStorageService.submitUserInterests(
        interests.map((i) => ({
          interest_id: i.interest_id as string,
          is_top_interest: i.is_top_interest === "YES",
        })),
      );

      toast({
        status: "success",
        title: "Interests updated successfully",
      });
      updateSubmittedInterests(true);
      updateConfig([
        { key: configExtras.user_completed_interests_2, value: "true" },
      ]);
      router.push(appRouteLinks.intro);
    } catch (error) {
      toast({
        status: "error",
        title: "Unable to save interests. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <QueryContainer loading={isLoading || loadingInterests} error={error}>
      <Flex flexDir="column">
        <Flex>
          <Button
            variant="secondary"
            onClick={() => router.push(appRouteLinks.intro)}
          >
            <FaChevronLeft />
            Back
          </Button>
        </Flex>
        <Text fontWeight="lg" fontSize="2xl" color="black" marginTop="1em">
          What is your top interest?
        </Text>
        <Text mt={2} color="black">
          We know you have lots of interests, but out of all the options below,
          if you could only choose one, which would be your top/most important
          interest? If you don&apos;t see it in the list, you can write it in.
        </Text>

        <Flex flexDir="column" mt="4">
          {result?.interestsByNoneTrait?.length ? (
            result?.interestsByNoneTrait?.map((trait: any) => (
              <InterestsAccordion
                key={"" + trait.id + key}
                title={trait.title as string}
                id={trait.id as string}
                defaultIndex={
                  flattenedInterests?.includes("" + trait.title) ? [0] : []
                }
                imageUrl={trait.image_url || ""}
              >
                <Flex flexDir="column">
                  <RadioGroup>
                    <Stack>
                      {trait?.interests?.map((interest: any, i: number) => (
                        <Flex
                          key={interest.id}
                          p="3"
                          bg={i % 2 === 0 ? "none" : "white"}
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

          <FormControl mt="3">
            <FormLabel as="h2">
              <Flex flexDir="column" pt="1em">
                <Text>Don&apos;t see your interest(s), list it here.</Text>
                <Text fontSize="small" color="black" fontStyle="italic">
                  Optional
                </Text>
              </Flex>
            </FormLabel>
            <Input
              border="1px solid"
              borderColor="black"
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Button
          isLoading={loading || creatingInterest}
          onClick={handleInterestsSubmit}
          mt="10"
        >
          Done
        </Button>
      </Flex>
    </QueryContainer>
  );
}

"use client";
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
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import localStorageService from "@/service/localStorage";

export default function InterestedExtendedPage() {
  const { updateConfig } = useAppConfig({});

  const [flattenedInterests, setFlattenedInterets] = useState<string[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  const [result, setResult] = useState<any>(null);

  const router = useRouter();

  const [key, setKey] = useState(1);

  const [interestsAnswer, updateInterestsAnswer] = useAppQuestions((state) => [
    state.interestsAnswer,
    state.updateInterestsAnswer,
  ]);

  useEffect(() => {
    const interests = localStorageService.getInterestsByNonTrait();
    setResult({ interestsByNoneTrait: interests });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const userInterests = localStorageService.getUserInterests();
    const interests: string[] = [];
    if (userInterests.length) {
      userInterests.forEach((interest) => {
        interests.push("" + interest.title);
      });
      setFlattenedInterets(interests);
      setKey(key + 1);
    } else {
      setFlattenedInterets([]);
    }
    setLoadingInterests(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toast = useToast();

  const mutate = async () => {
    setLoading(true);
    try {
      localStorageService.submitUserInterests(
        interestsAnswer.map((i) => ({
          interest_id: i.interest_id as string,
          is_top_interest: false,
        })),
      );
      toast({
        status: "success",
        title: "Interests updated successfully",
      });
      updateConfig([
        { key: configExtras.user_completed_interests_2, value: "true" },
      ]);
      router.push(appRouteLinks.growth);
    } catch (error) {
      toast({
        status: "error",
        title: "Unable to save interests. Please try again.",
      });
    }
    setLoading(false);
  };

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
            destination={appRouteLinks.interestsExpanded}
          />
        </Flex>
        <Text fontWeight="lg" fontSize="2xl">
          What are your interests
        </Text>
        <Flex flexDir="column" mt="4">
          {result?.interestsByNoneTrait?.length ? (
            result?.interestsByNoneTrait?.map((trait: any) => (
              <InterestsAccordion
                key={"" + trait.id + key}
                title={trait.title as string}
                id={trait.id as string}
                onChange={onChange}
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
    </QueryContainer>
  );
}

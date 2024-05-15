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
import {
  CREATE_USER_INTEREST,
  QUERY_INTERESTS_BY_NONE_TRAITS,
  QUERY_ME_INTERESTS,
  SUBMIT_USER_INTERESTS,
} from "@/features/dashboard/home/growth/queries";
import useAppConfig from "@/hooks/useAppConfig";
import { client } from "@/service";
import { useAppQuestions } from "@/store";
import { appRouteLinks, configExtras } from "@/utils/constants";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

type Interest = {
  __typename?: "Interest" | undefined;
  id?: string | null | undefined;
  image_url?: string | null | undefined;
  title?: string | null | undefined;
};

type MeInterestResponse = {
  __typename?: "Interest" | undefined;
  id?: string | null | undefined;
  title?: string | null | undefined;
  is_top_interest?: TopInterestEnum | null | undefined;
};

export default function InterestedExtendedPage() {
  const { updateConfig } = useAppConfig({});

  const [flattenedInterests, setFlattenedInterets] = useState<string[] | null>(
    null,
  );

  const [topSelectedInterest, setTopSelectedInterest] = useState<{
    id: string;
    title: string;
    interests: Array<Interest>;
  }>({ id: "", interests: [], title: "" });

  const [topChildInterest, setTopChildInterest] = useState({
    title: "",
    id: "",
  });

  const [newInterest, setNewInterest] = useState("");

  const router = useRouter();

  const [key, setKey] = useState(1);

  const [interestsAnswer, updateInterestsAnswer, updateSubmittedInterests] =
    useAppQuestions((state) => [
      state.interestsAnswer,
      state.updateInterestsAnswer,
      state.updateSubmittedInterests,
    ]);

  const {
    data: result,
    loading: isLoading,
    error,
  } = useQuery(QUERY_INTERESTS_BY_NONE_TRAITS);

  const getTopInterests = (interests: Array<MeInterestResponse>) => {
    const found = interests.map((interest) => {
      // @ts-ignore
      if (interest?.pivot?.is_top_interest === "YES") {
        return interest.title;
      }
      return null;
    });

    let topInterest = {
      id: "",
      title: "",
      interests: [],
    };
    let topChildInterest = {
      id: "",
      title: "",
    };

    result?.interestsByNoneTrait?.forEach((interest) => {
      if (found.includes(interest.title)) {
        topInterest = {
          id: interest.id || "",
          title: interest.title || "",
          interests: interest.interests as any,
        };
        interest.interests?.forEach((childInterest) => {
          if (found.includes(childInterest.title)) {
            topChildInterest = {
              title: childInterest.title || "",
              id: childInterest.id || "",
            };
          }
        });
      }
    });

    setTopSelectedInterest(topInterest);
    setTopChildInterest(topChildInterest);
  };

  const { loading: loadingInterests } = useQuery(QUERY_ME_INTERESTS, {
    onCompleted: (data) => {
      const interests: string[] = [];
      const interestsResponse = data?.me?.interests;
      if (interestsResponse?.length) {
        getTopInterests(interestsResponse);
        interestsResponse?.forEach((interest) => {
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

  const [mutate, { loading }] = useMutation(SUBMIT_USER_INTERESTS, {
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
      updateSubmittedInterests(true);
      await client.refetchQueries({
        include: ["QUERY_INTERESTS_BY_NONE_TRAITS"],
      });
      updateConfig([
        { key: configExtras.user_completed_interests_2, value: "true" },
      ]);
      router.push(appRouteLinks.intro);
    },
  });

  const [createInterest, { loading: creatingInterest }] = useMutation(
    CREATE_USER_INTEREST,
    {
      onError: () => {
        toast({
          status: "error",
          title: "Unable to create your interests. Please try again.",
        });
      },
    },
  );

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

  const selectTopInterest = (interestId: any) => {
    if (!interestId) {
      toast({
        status: "error",
        title: "Invalid selection",
      });
      return;
    }
    const res = result?.interestsByNoneTrait?.find(
      (interest) => interest.id === interestId,
    );

    setTopChildInterest({
      title: "",
      id: "",
    });

    setTopSelectedInterest({
      id: res?.id || "",
      title: res?.title || "",
      interests: res?.interests || [],
    });
  };

  const handleInterestsSubmit = async () => {
    if (!topSelectedInterest.id || !topChildInterest.id) {
      toast({
        status: "error",
        title: "Please select your top interests",
      });
      return;
    }

    const topInterestsIds = [topChildInterest.id, topSelectedInterest.id];
    const allInterestIds = interestsAnswer.map(
      (interest) => interest.interest_id,
    );

    let interests: SubmitUserInterestInput[] = [];

    if (allInterestIds.includes(topSelectedInterest.id)) {
      interests = interestsAnswer.map((interest) => {
        if (topInterestsIds.includes(interest.interest_id)) {
          return {
            ...interest,
            is_top_interest: "YES" as InputMaybe<TopInterestEnum>,
          };
        }
        return interest;
      });
    } else {
      interests = [
        ...interestsAnswer,
        {
          response: topSelectedInterest.title,
          interest_id: topSelectedInterest.id,
          is_top_interest: "YES" as InputMaybe<TopInterestEnum>,
        },
        {
          response: topChildInterest.title,
          interest_id: topChildInterest.id,
          is_top_interest: "YES" as InputMaybe<TopInterestEnum>,
        },
      ];
    }

    if (newInterest) {
      await createInterest({
        variables: {
          input: {
            title: newInterest,
            description: newInterest,
            image_url: "",
          },
        },
        onCompleted: (data) => {
          const interest = data.createInterest;
          interests = [
            ...interests,
            {
              response: interest?.title || "",
              interest_id: interest?.id || "",
              is_top_interest: "NO" as InputMaybe<TopInterestEnum>,
            },
          ];
        },
      });
    }

    updateInterestsAnswer(interests);

    mutate({
      variables: {
        input: {
          inputs: interests,
        },
      },
    });
  };

  const handleSelectTopChildrenInterest = (value: string) => {
    const selectedChild = topSelectedInterest.interests.find(
      (interest) => interest.id === value,
    );

    setTopChildInterest({
      title: selectedChild?.title || "",
      id: value,
    });
  };

  return (
    <QueryContainer loading={isLoading || loadingInterests} error={error}>
      <Flex flexDir="column">
        <Flex justifyContent="flex-end">
          <BackButton icon={<GrClose />} destination={appRouteLinks.intro} />
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
                imageUrl={trait.image_url || ""}
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

          <Divider mt="7" borderColor="gray.500" />

          <Flex flexDir="column" mt="5" gap="5">
            <FormControl>
              <FormLabel>
                Out of all these options, what is your top interest?
              </FormLabel>
              <Select
                border="1px solid"
                borderColor="gray.500"
                value={topSelectedInterest.id}
                onChange={(e) => selectTopInterest(e.target.value)}
                key="interestParent"
              >
                <option value="" key="interestParent-1">
                  Choose one option
                </option>
                {result?.interestsByNoneTrait?.map((interest) => (
                  <option key={interest.id} value={interest.id || ""}>
                    {interest.title}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isDisabled={!topSelectedInterest.interests.length}>
              <FormLabel>
                Within that category, what is your top interest?
              </FormLabel>
              <Select
                key="interestChild"
                border="1px solid"
                borderColor="gray.500"
                onChange={(e) =>
                  handleSelectTopChildrenInterest(e.target.value)
                }
                value={topChildInterest.id}
              >
                <option key="interestChild-1" value="">
                  Choose one option
                </option>
                {topSelectedInterest.interests.map((interest) => (
                  <option key={interest.id} value={interest.id || ""}>
                    {interest.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>
          <FormControl mt="3">
            <FormLabel as="h2">
              <Flex flexDir="column">
                <Text>Don&apos;t see your interest(s), list it here.</Text>
                <Text fontSize="small" color="gray.500">
                  Optional
                </Text>
              </Flex>
            </FormLabel>
            <Input
              border="1px solid"
              borderColor="gray.400"
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

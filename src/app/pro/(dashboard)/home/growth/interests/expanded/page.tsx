"use client";
import BackButton from "@/components/General/BackButton";
import useAppConfig from "@/hooks/useAppConfig";
import { useAppQuestions } from "@/store";
import { appRouteLinks, configExtras } from "@/utils/constants";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import localStorageService from "@/service/localStorage";

export default function InterestedExtendedPage() {
  const router = useRouter();
  const [interestsAnswer] = useAppQuestions((state) => [state.interestsAnswer]);
  const toast = useToast();
  const [proceed, setProceed] = useState(false);

  const ref = useRef(true);

  const { updateConfig } = useAppConfig({});

  const mutate = () => {
    try {
      localStorageService.submitUserInterests(
        interestsAnswer.map((i) => ({
          interest_id: i.interest_id as string,
          is_top_interest: false,
        })),
      );
      updateConfig([
        { key: configExtras.user_completed_interests_1, value: "true" },
      ]);
      setProceed(true);
    } catch (error) {
      toast({
        status: "error",
        title:
          "Unable to save interests. Please click the close button above to try again",
      });
    }
  };

  useEffect(() => {
    if (ref.current) {
      mutate();
    }
    return () => {
      ref.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDir="column">
      <Flex justifyContent="flex-end">
        <BackButton
          icon={<GrClose />}
          destination={appRouteLinks.growthInterests}
        />
      </Flex>
      <Flex h="80vh" gap="5" flexDir="column" justifyContent="center">
        <Text fontWeight="lg" fontSize="2xl">
          Expanded interests
        </Text>
        <Text>
          Now we want to learn more about your specific interests. Select all
          the interests that you enjoy and we&apos;ll use this information to
          refine your social matches.
        </Text>
        <Button
          isDisabled={!proceed}
          onClick={() => {
            router.push(appRouteLinks.interestsExpandedMore);
          }}
        >
          Begin
        </Button>
      </Flex>
    </Flex>
  );
}

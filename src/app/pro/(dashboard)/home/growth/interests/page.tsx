"use client";
import BackButton from "@/components/General/BackButton";
import QueryContainer from "@/components/General/QueryContainer";
import { QUERY_INTERESTS_BY_TRAITS } from "@/features/dashboard/home/growth/queries";
import { QUERY_ME_PERSONALITY_SCORE } from "@/features/intro/gql";
import { useUserStore } from "@/store";
import { appRouteLinks } from "@/utils/constants";
import { useQuery } from "@apollo/client";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function InterestsPage() {
  const router = useRouter();
  const [setPersonalityType] = useUserStore((state) => [
    state.setPersonalityType,
  ]);
  const { loading, error } = useQuery(QUERY_INTERESTS_BY_TRAITS);
  useQuery(QUERY_ME_PERSONALITY_SCORE, {
    onCompleted: (data) => {
      setPersonalityType({
        name: data.me?.personalityScore?.personalityBucketType?.name || "",
        subTitle:
          data.me?.personalityScore?.personalityBucketType?.sub_title || "",
      });
    },
  });

  return (
    <QueryContainer loading={loading} error={error}>
      <Center h="80vh">
        <Flex flexDir="column" w="full" h="full" gap="5">
          <BackButton destination={appRouteLinks.growth} />
          <Flex flexDir="column" h="full" justifyContent="center" gap="4">
            <Text fontSize="2xl" fontWeight="semibold">
              Interests Inventory
            </Text>
            <Text mt="2">
              In this exercise, we&apos;ll show you pairs of photos. Choose
              whcih one you like more. This will help us match your interests
              with others who enjoy similar types of activities.
            </Text>
          </Flex>
          <Button
            mt="auto"
            onClick={() => {
              router.push(`${appRouteLinks.interestsExpandedMore}`);
            }}
          >
            Begin
          </Button>
        </Flex>
      </Center>
    </QueryContainer>
  );
}

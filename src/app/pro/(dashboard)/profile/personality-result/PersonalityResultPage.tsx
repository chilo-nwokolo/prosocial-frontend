"use client";
import QueryContainer from "@/components/General/QueryContainer";
import { QUERY_ME_PERSONALITY_SCORE } from "@/features/intro/gql";
import { useUserStore } from "@/store";
import { ImageLinks, appRouteLinks } from "@/utils/constants";
import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function PersonalityResultPage() {
  // eslint-disable-next-line no-unused-vars
  const [personalityType, setPersonalityType] = useUserStore((state) => [
    state.personalityType,
    state.setPersonalityType,
  ]);

  const { data, loading, error } = useQuery(QUERY_ME_PERSONALITY_SCORE, {
    fetchPolicy: "network-only",
  });

  const result = data?.me?.personalityScore?.personalityBucketType;

  return (
    <QueryContainer loading={loading} error={error}>
      <Flex mt="5" flexDir="column">
        <Text fontWeight="500" fontSize="xl">
          Based on your answers to these additional questions, you seem to be:{" "}
        </Text>
        <Flex flexDir="column" alignItems="center" my="8">
          <Image
            src={result?.image || ImageLinks.logo}
            alt={result?.name || "Image of character"}
            w="60"
            h="60"
            objectFit="contain"
          />
          <Text fontSize="2xl" fontWeight="bold" marginTop="5">
            {result?.name}
          </Text>
          <Text>{result?.sub_title}</Text>
          <Text mt="4">{result?.description}</Text>
        </Flex>
        <Flex flexDir="column" gap="5" mb="6">
          {result?.bucketQuestions?.map((question) => (
            <Card key={question.id} bg="bg">
              <CardBody>
                <Heading mb="2" fontSize="lg">
                  {question.title}
                </Heading>
                <Text fontSize="md">{question.text}</Text>
              </CardBody>
            </Card>
          ))}
        </Flex>
        <Link href={appRouteLinks.home}>
          <Button width="full">Go back</Button>
        </Link>
      </Flex>
    </QueryContainer>
  );
}

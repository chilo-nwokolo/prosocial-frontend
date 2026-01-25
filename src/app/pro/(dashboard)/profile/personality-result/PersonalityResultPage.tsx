"use client";
import QueryContainer from "@/components/General/QueryContainer";
import { useUserStore } from "@/store";
import { ImageLinks, appRouteLinks } from "@/utils/constants";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

export default function PersonalityResultPage() {
  // eslint-disable-next-line no-unused-vars
  const [personalityType, setPersonalityType] = useUserStore((state) => [
    state.personalityType,
    state.setPersonalityType,
  ]);
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const score = localStorageService.getPersonalityScore();
    if (!score?.personalityBucketType) {
      toast({
        status: "error",
        title: "Please complete your registration first",
      });
      router.push(appRouteLinks.onbording);
    } else {
      setResult(score.personalityBucketType);
    }
    setLoading(false);
  }, [router, toast]);

  return (
    <QueryContainer loading={loading} error={error}>
      <Flex mt="5" flexDir="column">
        <Flex>
          <Button
            color="black"
            variant="secondary"
            onClick={() => router.back()}
          >
            <FaChevronLeft />
            Back
          </Button>
        </Flex>
        <Text fontWeight="500" mt={5} fontSize="xl">
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
          {result?.bucketQuestions?.map((question: any) => (
            <Card
              key={question.id}
              bg="none"
              borderRadius="0"
              borderColor="black"
              border="1px"
            >
              <CardBody>
                <Heading mb="2" fontSize="18px" fontWeight="400">
                  {question.title}
                </Heading>
                <Text fontSize="md">{question.text}</Text>
              </CardBody>
            </Card>
          ))}
        </Flex>
        <Link href={appRouteLinks.home}>
          <Button width="full">Dashboard</Button>
        </Link>
      </Flex>
    </QueryContainer>
  );
}

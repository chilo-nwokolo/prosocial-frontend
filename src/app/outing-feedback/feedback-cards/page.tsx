"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import StudentRateBox from "../components/StudentRateBox";
import Link from "next/link";
import { appRouteLinks } from "@/utils/constants";

export default function OutingFeedbackCards() {
  return (
    <Flex flexDir="column">
      <Text fontSize="sm" textAlign="right">
        Complete in about 3 minutes.
      </Text>
      <Text fontSize="2xl" mt="3" fontWeight="semibold">
        Outing feedback
      </Text>
      <Text mt="3">
        Did you feel a connection with anyone in your group? This will determine
        if we match you with them again.
      </Text>
      <Flex mt="5" flexDir="column" gap="5">
        {["Elvis Presley", "John Lennon", "Dolly Parton", "Elton John"].map(
          (i) => (
            <StudentRateBox key={i} name={i} />
          ),
        )}
      </Flex>
      <Flex mt="5" justifyContent="center">
        <Link href={appRouteLinks.outingFeedbackQuestions}>
          <Button>Save</Button>
        </Link>
      </Flex>
    </Flex>
  );
}

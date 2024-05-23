"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { appRouteLinks } from "@/utils/constants";
import { useGlobalStore } from "@/store";
import dynamic from "next/dynamic";

const StudentRateBox = dynamic(
  () => import("../../components/StudentRateBox"),
  { ssr: false },
);

export default function OutingFeedback() {
  const [outingGroupMembers, interactionFeedback] = useGlobalStore((state) => [
    state.outingGroupMembers,
    state.interactionFeedback,
  ]);

  return (
    <Flex flexDir="column">
      <Text fontSize="2xl" mt="3" fontWeight="semibold">
        Outing feedback
      </Text>
      <Text mt="3">
        Did you feel a connection with anyone in your group? This will determine
        if we match you with them again.
      </Text>
      <Flex mt="5" flexDir="column" gap="5">
        {outingGroupMembers?.map((user) => {
          return <StudentRateBox key={user?.id} user={user} />;
        })}
      </Flex>
      <Flex mt="5" justifyContent="center">
        <Link href={appRouteLinks.outingFeedbackQuestions}>
          <Button
            isDisabled={
              outingGroupMembers?.length !== interactionFeedback.length
            }
          >
            Save
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

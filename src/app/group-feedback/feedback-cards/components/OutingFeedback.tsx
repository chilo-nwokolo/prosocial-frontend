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
  const [groupData, interactionFeedback, userData] = useGlobalStore((state) => [
    state.groupData,
    state.interactionFeedback,
    state.userData,
  ]);

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
        {groupData?.users?.map((user) => {
          if (user.unique_id === userData?.userId) {
            return null;
          }
          return <StudentRateBox key={user.id} user={user} />;
        })}
      </Flex>
      <Flex mt="5" justifyContent="center">
        <Link href={appRouteLinks.outingFeedbackQuestions}>
          <Button
            isDisabled={
              Number(groupData?.users?.length) - 1 !==
              interactionFeedback.length
            }
          >
            Save
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

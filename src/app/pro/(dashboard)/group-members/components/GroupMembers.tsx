"use client";
import { useUserStore } from "@/store";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MemberCard from "./MemberCard";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { appRouteLinks } from "@/utils/constants";
import { useMemo } from "react";

export default function GroupMembers() {
  const router = useRouter();
  const [userProfile] = useUserStore((state) => [state.userProfile]);
  const activeGroup = useMemo(() => {
    if (!userProfile?.me?.groups) return null;
    let groups = [...userProfile.me.groups]?.sort((a, b) => {
      if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1;
      }

      if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1;
      }
      return 0;
    });
    console.log(groups);
    return groups?.[0];
  }, [userProfile]);
  const handleStartFeedback = () => {
    router.push(
      `${appRouteLinks.outingFeedback}?userId=${userProfile?.me?.unique_id}&groupId=${activeGroup?.id}`,
    );
  };
  return (
    <Flex flexDir="column">
      <Flex>
        <Button color="black" variant="secondary" onClick={() => router.back()}>
          <FaChevronLeft />
          Back
        </Button>
      </Flex>
      <Text fontWeight="600" fontSize="24px" mt="5">
        Your group
      </Text>

      <Flex flexDir="column" mt="4">
        {activeGroup?.users?.map((user) => (
          <MemberCard name={user.name} key={user.id} />
        ))}
      </Flex>
      <Box borderBottom={"1px"} borderColor={"black"} height={"1px"} />
      <Button onClick={handleStartFeedback} mt="10">
        Start feedback
      </Button>
    </Flex>
  );
}

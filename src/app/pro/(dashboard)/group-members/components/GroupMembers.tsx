"use client";
import { useUserStore } from "@/store";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MemberCard from "./MemberCard";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { appRouteLinks } from "@/utils/constants";

export default function GroupMembers() {
  const router = useRouter();
  const [userProfile] = useUserStore((state) => [state.userProfile]);

  const handleStartFeedback = () => {
    router.push(
      `${appRouteLinks.outingFeedback}?userId=${userProfile?.me?.unique_id}&groupId=${userProfile?.me?.groups?.[0]?.id}`,
    );
  };
  return (
    <Flex flexDir="column">
      <Flex>
        <Button color="black" variant="secondary" onClick={() => router.back()}>
          <FaChevronLeft />
        </Button>
      </Flex>
      <Text fontWeight="lg" fontSize="2xl" mt="5">
        Your group
      </Text>

      <Flex flexDir="column" mt="4">
        {userProfile?.me?.groups?.[0]?.users?.map((user) => (
          <MemberCard name={user.name} key={user.id} />
        ))}
      </Flex>
      <Box border={"1px"} borderColor={"gray"} height={"1px"} />
      <Button onClick={handleStartFeedback} mt="10">
        Start feedback
      </Button>
    </Flex>
  );
}

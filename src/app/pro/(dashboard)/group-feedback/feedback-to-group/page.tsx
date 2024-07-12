"use client";
import { useGlobalStore } from "@/store";
import { appRouteLinks } from "@/utils/constants";
import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FeedbackToGroup() {
  const [outingGroupMembers, setExcludeUsers, excludeUsers] = useGlobalStore(
    (state) => [
      state.outingGroupMembers,
      state.setExcludeUsers,
      state.excludeUsers,
    ],
  );

  const router = useRouter();
  const [checked, setChecked] = useState<string[]>([]);

  const handleCheck = (id: string) => {
    if (checked.includes(id)) {
      const result = checked.filter((userId) => userId !== id);
      setChecked(result);
      return;
    }
    setChecked([...checked, id]);
  };

  const handleSubmit = () => {
    setExcludeUsers(checked);
    router.push(appRouteLinks.outingFeedbackHowDidTheOutingGo);
  };

  return (
    <Flex flexDir="column" gap="3">
      <Text fontSize="2xl" as="h1" mt="3" fontWeight="semibold">
        Is there anyone from your outing you don&apos;t want to see again?
      </Text>
      <Text fontSize="sm">
        We definitely won&apos;t match you with them again
      </Text>
      <Flex
        border="1px solid"
        borderColor="#000"
        h="400px"
        maxH="400px"
        backgroundColor="#fff"
        overflowY="auto"
        p="3"
        flexDir="column"
      >
        {outingGroupMembers?.map((user, i) => {
          return (
            <Box p="3" bg={i % 2 === 0 ? "gray.100" : "#fff"} key={user.id}>
              <Checkbox
                value={user.id}
                defaultChecked={excludeUsers.includes(user.id)}
                onChange={() => handleCheck(user.id)}
              >
                {user.name}
              </Checkbox>
            </Box>
          );
        })}
      </Flex>
      <Button mt="10" w="full" onClick={handleSubmit}>
        Next
      </Button>
    </Flex>
  );
}

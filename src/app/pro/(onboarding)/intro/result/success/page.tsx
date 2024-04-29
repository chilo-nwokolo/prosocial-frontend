import { appRouteLinks } from "@/utils/constants";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <Center h="90vh">
      <Box my="auto" w="full">
        <Text fontSize="2xl" fontWeight="medium" mb="5">
          Awesome!
        </Text>
        <Text>
          You have been sent a confirmation email that you completed the
          registration. You will receive an email by June 1 with the members of
          your group for your outing.
        </Text>
        <Flex flexDir="column" gap="4" mt="10">
          <Link href={`${appRouteLinks.home}`}>
            <Button w="full">Done</Button>
          </Link>
        </Flex>
      </Box>
    </Center>
  );
}

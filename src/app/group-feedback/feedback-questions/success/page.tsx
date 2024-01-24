import { appRouteLinks } from "@/utils/constants";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function OutingFeedbackSuccessPage() {
  return (
    <Center h="90vh">
      <Box my="auto" w="full">
        <Text fontSize="2xl" fontWeight="medium" mb="5">
          Success!
        </Text>
        <Text>
          Thank you for providing your feedback. If you have additional
          feedback, please email Dr. Chopik.
        </Text>
        <Flex flexDir="column" gap="4" mt="10">
          <Link href={appRouteLinks.login}>
            <Button w="full">Finish</Button>
          </Link>
        </Flex>
      </Box>
    </Center>
  );
}

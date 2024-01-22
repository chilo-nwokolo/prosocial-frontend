import { appRouteLinks } from "@/utils/constants";
import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import Link from "next/link";

export default function FeedbackQuestionsPage() {
  return (
    <Flex flexDir="column">
      <Text fontSize="sm" textAlign="right">
        Complete in about 3 minutes.
      </Text>
      <Text fontSize="2xl" mt="3" fontWeight="semibold">
        Two Questions
      </Text>
      <Box>
        <Text my="3">
          You said you did not feel a connection with John Lennon. Can you tell
          us why?
        </Text>
        <Textarea
          rows={10}
          placeholder="Write your thoughts here. Your response is private and will never be shared outside of the ProSocial admin team. We'll use your feedback to improve our matching for social outings."
        />
      </Box>
      <Box mt="3">
        <Text my="3">
          You said you did feel a connection with Dolly Parton. Could you tell
          us why?
        </Text>
        <Textarea
          rows={10}
          placeholder="Write your thoughts here. Your response is private and will never be shared outside of the ProSocial admin team. We'll use your feedback to improve our matching for social outings."
        />
      </Box>
      <Flex mt="5" justifyContent="center">
        <Link href={appRouteLinks.outingFeedbackSuccess}>
          <Button>Save</Button>
        </Link>
      </Flex>
    </Flex>
  );
}

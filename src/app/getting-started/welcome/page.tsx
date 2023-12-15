import TranscriptComponent from "@/components/General/TranscriptComponent";
import YoutubeEmbed from "@/components/General/YoutubeEmbed";
import { appRouteLinks, youtubeLinks } from "@/utils/constants";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <Box mt="20">
      <Text as="h1" fontSize="2xl" color="primary.200" fontWeight="medium">
        Welcome to ProSocial
      </Text>
      <Flex flexDir="column" gap="5" color="primary.200" my="5">
        <Text>
          We offer the opportunity to discover new friendships with amazing
          people!
        </Text>
        <Text>Here&apos;s what to expect as you start your journey:</Text>
      </Flex>
      <YoutubeEmbed embedId={youtubeLinks.welcomePageMobile} />
      <TranscriptComponent>
        <Flex flexDir="column" gap="3">
          <Text>
            Welcome to ProSocial! Our goal is to enhance your life by helping
            you discover meaningful friendships.
          </Text>
          <Text>
            But first, we need to collect some information about you. We’ve
            teamed up with experts who have crafted surveys, questionnaires, and
            tools that will guide you through a journey of learning about
            yourself so that you can form deep relationships with others.
          </Text>
          <Text>
            Please answer the followings questions as honestly as possible so
            that we can have a better understanding of who you are as a person.
            It’ll take less than 5 minutes. Our platform is safe, encrypted and
            anonymous. I’ll see you on the other side of the registration
            process!
          </Text>
        </Flex>
      </TranscriptComponent>
      <Flex justifyContent="center" flexDir="column" gap="4" my="8">
        <Link href={appRouteLinks.serviceTerms}>
          <Button w="full">Next</Button>
        </Link>
      </Flex>
    </Box>
  );
}

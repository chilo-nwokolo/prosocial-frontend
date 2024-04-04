import { appRouteLinks } from "@/utils/constants";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ServiceTermsPage() {
  return (
    <Box>
      <Text as="h1" fontSize="2xl" fontWeight="medium">
        About our terms of service
      </Text>
      <Text my="4" fontSize="lg" fontWeight="medium">
        How we use your data
      </Text>
      <Text>
        Before you are inundated with our Terms of Service, which is written in
        legalese, we wanted to provide a no-nonsense version of how we are using
        your data. Firstly, all of your data is encrypted on secure servers.
        Secondly, we will never sell your data. Everything you provide for
        ProSocial is being used for research purposes to help us figure out the
        nuances involved in how humans form friendships. When your data is
        utilized for academic research, rest assured that every piece of data is
        anonymized with all identifiable information being removed. Our mission
        is to help members of society by enriching their quality of life with
        opportunities to socialize, serve your community and explore important
        questions. Thank you for being part of this effort to change our world
        for the better!
      </Text>
      <Flex justifyContent="center" mt="10">
        <Link href={appRouteLinks.termsConditions}>
          <Button>View terms and conditions</Button>
        </Link>
      </Flex>
    </Box>
  );
}

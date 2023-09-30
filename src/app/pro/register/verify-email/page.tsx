import { appRouteLinks } from "@/utils/constants";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function EmailConfirmationPage() {
  return (
    <Center h="100vh">
      <Flex flexDir="column" my="auto" gap="10">
        <Text as="h1" fontSize="2xl" fontWeight="medium">
          Verify your Email Address
        </Text>
        <Text>
          We have sent you an email to verify your email address. Verifying your email address give you access to all the awesome features in ProSocial.
        </Text>
        <Link href={appRouteLinks.intro}>
          <Button>
            Next
          </Button>
        </Link>
      </Flex>
    </Center>
  )
}
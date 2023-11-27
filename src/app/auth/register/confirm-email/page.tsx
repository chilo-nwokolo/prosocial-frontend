import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { appRouteLinks } from "@/utils/constants";
import Link from "next/link";

export default function EmailConfirmationPage() {
  return (
    <Center h="90vh">
      <Flex flexDir="column" my="auto" gap="10">
        <Text as="h1" fontSize="2xl" fontWeight="medium">
          Confirm your email address
        </Text>
        <Text>
          We have sent you an email to verify your email address. Verifying your
          email address give you access to all the awesome features in
          ProSocial.
        </Text>
        <Link href={appRouteLinks.login}>
          <Button w="full">Go to Login</Button>
        </Link>
      </Flex>
    </Center>
  );
}

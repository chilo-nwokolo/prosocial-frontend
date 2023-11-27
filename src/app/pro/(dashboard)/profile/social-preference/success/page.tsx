import { appRouteLinks } from "@/utils/constants";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function SocialScheduleSuccess() {
  return (
    <Center h="90vh">
      <Flex flexDir="column" px="10" gap="5">
        <Text fontWeight="semibold" fontSize="2xl">
          Success
        </Text>
        <Text>
          Thank you for filling out your information. We&apos;ll email you when
          we have a group for a social outing with Dr. Chopik
        </Text>
        <Link href={appRouteLinks.home}>
          <Button w="full">Finish</Button>
        </Link>
      </Flex>
    </Center>
  );
}

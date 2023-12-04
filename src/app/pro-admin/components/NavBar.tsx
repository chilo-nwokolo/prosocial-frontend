import { appRouteLinks } from "@/utils/constants";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function AdminNavBar() {
  return (
    <Flex
      as="nav"
      borderBottom="1px solid"
      borderColor="primary.100"
      py="5"
      px="10"
      justifyContent="space-between"
      position="fixed"
      w="full"
      top="0"
      bg="bg"
      zIndex="50"
    >
      <Text>Prosocial</Text>
      <Flex gap="4">
        <Link href={""}>User Data</Link>
        <Link href={""}>Groups</Link>
        <Link href={""}>Demo Locations</Link>
        <Link href={appRouteLinks.login}>Logout</Link>
      </Flex>
    </Flex>
  );
}

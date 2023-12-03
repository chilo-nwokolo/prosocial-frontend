import { Flex, Text } from "@chakra-ui/react";

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
        <Text>User Data</Text>
        <Text>Groups</Text>
        <Text>Demo Locations</Text>
        <Text>Logout</Text>
      </Flex>
    </Flex>
  );
}

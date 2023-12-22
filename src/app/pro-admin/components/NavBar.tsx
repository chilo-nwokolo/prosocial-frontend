"use client";
import { deleteCookie } from "@/libs/cookies";
import { client } from "@/service";
import { AccessToken, adminRoutes } from "@/utils/constants";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavBar() {
  const router = useRouter();

  const logout = () => {
    deleteCookie(AccessToken);
    deleteCookie("userType");
    router.push(adminRoutes.login);
    client.clearStore();
  };
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
        <Link href={adminRoutes.users}>User Data</Link>
        <Link href={adminRoutes.groups}>Groups</Link>
        <Link href={adminRoutes.demoLocations}>Demo Locations</Link>
        <Text cursor="pointer" onClick={logout}>
          Logout
        </Text>
      </Flex>
    </Flex>
  );
}

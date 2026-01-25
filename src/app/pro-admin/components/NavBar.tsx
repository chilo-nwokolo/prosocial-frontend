"use client";
import { deleteCookie } from "@/libs/cookies";
import { AccessToken, adminRoutes, storeKeys } from "@/utils/constants";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import localStorageService from "@/service/localStorage";

const navItems = [
  { id: 1, title: "User Data", link: adminRoutes.users },
  { id: 2, title: "Groups", link: adminRoutes.groups },
];

export default function AdminNavBar() {
  const router = useRouter();

  const logout = () => {
    deleteCookie(AccessToken);
    deleteCookie("userType");
    localStorage.removeItem(storeKeys.USER_STORE);
    localStorage.removeItem(storeKeys.QUESTIONS_STORE);
    localStorageService.logout();
    router.push(adminRoutes.login);
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
        {navItems.map((item) => (
          <Link href={item.link} key={item.title}>
            {item.title}
          </Link>
        ))}
        <Text cursor="pointer" onClick={logout}>
          Logout
        </Text>
      </Flex>
    </Flex>
  );
}

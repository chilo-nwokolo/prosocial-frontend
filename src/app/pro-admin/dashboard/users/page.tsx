import { Box, Text } from "@chakra-ui/react";
import UsersPage from "./components/UsersPage";

export default function AdminUsersPage() {
  return (
    <Box>
      <Text as="h1" fontWeight="semibold" fontSize="2xl">
        Users Data
      </Text>
      <UsersPage />
    </Box>
  );
}

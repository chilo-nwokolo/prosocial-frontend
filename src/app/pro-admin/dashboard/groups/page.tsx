import { Box, Text } from "@chakra-ui/react";
import GroupTable from "./components/GroupTable";

export default function AdminGroupPage() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold">
        Groups for Test Outings
      </Text>
      <Box>
        <GroupTable />
      </Box>
    </Box>
  );
}

import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import AdminTable from "../../components/AdminTable";
import ColumnsDropdown from "./components/ColumnsDropdown";

export default function UsersPage() {
  return (
    <Box>
      <Text as="h1" fontWeight="semibold" fontSize="2xl">
        Users Data
      </Text>
      <Box mt="4">
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem colSpan={3} bg="papayawhip"></GridItem>
          <GridItem colSpan={1}>
            <ColumnsDropdown />
          </GridItem>
        </Grid>
        <Box minH="1000px">
          <AdminTable />
        </Box>
      </Box>
    </Box>
  );
}

import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import AdminTable from "../../components/AdminTable";
import TableColumnsFilterDropdown from "./components/TableColumnsFilterDropdown";
import AdminUserAccordion from "../../components/AdminUserAccordion";

export default function AdminUsersPage() {
  return (
    <Box>
      <Text as="h1" fontWeight="semibold" fontSize="2xl">
        Users Data
      </Text>
      <Box mt="4">
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb="5">
          <GridItem colSpan={3} borderWidth="1px" borderColor="primary.100">
            <AdminUserAccordion />
          </GridItem>
          <GridItem colSpan={1}>
            <TableColumnsFilterDropdown />
          </GridItem>
        </Grid>
        <Box minH="1000px">
          <AdminTable />
        </Box>
      </Box>
    </Box>
  );
}

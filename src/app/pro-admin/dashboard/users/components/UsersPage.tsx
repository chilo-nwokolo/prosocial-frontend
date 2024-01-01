"use client";
import AdminUserAccordion from "@/app/pro-admin/components/AdminUserAccordion";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import TableColumnsFilterDropdown from "./TableColumnsFilterDropdown";
import AdminTable from "./AdminTable";
import AdminModal from "@/app/pro-admin/components/AdminModal";
import CreateGroupModal from "./CreateGroupModal";
import PaginationData from "./PaginationData";
import useUsersAdminPage from "../hooks/useUsersAdminPage";

export default function UsersPage() {
  const {
    table,
    data,
    loading,
    isCreateGroupModal,
    openCreateGroupModal,
    closeCreateGroupModal,
  } = useUsersAdminPage();

  return (
    <Box mt="4">
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb="5">
        <GridItem colSpan={3} borderWidth="1px" borderColor="primary.100">
          <AdminUserAccordion />
        </GridItem>
        <GridItem colSpan={1}>
          <TableColumnsFilterDropdown table={table} />
        </GridItem>
      </Grid>
      <Flex alignItems="center" justifyContent="space-between" my="9">
        <Box>
          <Text>{data?.adminQueryUsers?.length} Records</Text>
        </Box>
        <Flex gap="4">
          <Button onClick={openCreateGroupModal}>Add to group</Button>
          <Button>Download data as CSV</Button>
        </Flex>
        <Box>
          <Button>Delete</Button>
        </Box>
      </Flex>
      <Box minH="1000px" mt="10px">
        {loading ? (
          <Box h="500px">
            <Skeleton h="full" w="full" />
          </Box>
        ) : (
          <>
            <AdminTable table={table} />
            <PaginationData table={table} />
          </>
        )}
      </Box>
      <AdminModal
        title="Create Group"
        isOpen={isCreateGroupModal}
        onClose={closeCreateGroupModal}
        body={<CreateGroupModal table={table} />}
        size="2xl"
      />
    </Box>
  );
}

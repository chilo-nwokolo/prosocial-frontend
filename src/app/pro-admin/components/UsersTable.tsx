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
import TableColumnsFilterDropdown from "@/app/pro-admin/dashboard/users/components/TableColumnsFilterDropdown";
import AdminTable from "@/app/pro-admin/dashboard/users/components/AdminTable";
import AdminModal from "@/app/pro-admin/components/AdminModal";
import CreateGroupModal from "@/app/pro-admin/dashboard/users/components/CreateGroupModal";
import PaginationData from "@/app/pro-admin/dashboard/users/components/PaginationData";

type Props = {
  table: any;
  data: any;
  loading: boolean;
  isCreateGroupModal: any;
  openCreateGroupModal: () => void;
  closeCreateGroupModal: () => void;
};

export default function UsersTable({
  table,
  data,
  loading,
  isCreateGroupModal,
  openCreateGroupModal,
  closeCreateGroupModal,
}: Props) {
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
          <Button
            onClick={openCreateGroupModal}
            isDisabled={!table.getSelectedRowModel().flatRows.length}
          >
            Add to group
          </Button>
          <Button isDisabled={!table.getSelectedRowModel().flatRows.length}>
            Download data as CSV
          </Button>
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
        body={
          <CreateGroupModal table={table} onClose={closeCreateGroupModal} />
        }
        size="2xl"
      />
    </Box>
  );
}

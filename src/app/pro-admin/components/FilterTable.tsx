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
import TableColumnsFilterDropdown from "../dashboard/users/components/TableColumnsFilterDropdown";
import dynamic from "next/dynamic";
import PaginationData from "../dashboard/users/components/PaginationData";
import { useFilterContext } from "../dashboard/users/hooks/useFilterContext";

const AdminTable = dynamic(
  () => import("@/app/pro-admin/dashboard/users/components/AdminTable"),
  { ssr: false },
);

type Props = {
  table: any;
  data: any;
  loading: boolean;
  openCreateGroupModal: () => void;
};

export default function FilterTable({
  table,
  data,
  loading,
  openCreateGroupModal,
}: Props) {
  const { groupView } = useFilterContext();
  return (
    <>
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
          {!groupView ? (
            <>
              <Button
                onClick={openCreateGroupModal}
                // isDisabled={!table.getSelectedRowModel().flatRows.length}
              >
                Add to group
              </Button>
              <Button
              // isDisabled={!table.getSelectedRowModel().flatRows.length}
              >
                Download data as CSV
              </Button>
            </>
          ) : null}
        </Flex>
        <Box>{/* <Button>Delete</Button> */}</Box>
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
    </>
  );
}

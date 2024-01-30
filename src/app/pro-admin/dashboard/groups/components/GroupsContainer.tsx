"use client";
import { Box, Text } from "@chakra-ui/react";
import GroupTable from "./GroupTable";
import { useQuery } from "@apollo/client";
import QueryContainer from "@/components/General/QueryContainer";
import { QUERY_GROUPS } from "../gql/queries";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { groupColumns } from "./GroupTableColumns";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/utils/constants";

export default function GroupsContainer() {
  const { data, loading, error } = useQuery(QUERY_GROUPS, {
    fetchPolicy: "cache-and-network",
  });

  const router = useRouter();

  const table = useReactTable({
    // @ts-ignore
    data: data?.groups || [],
    columns: groupColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSelectedRow = (row: any) => {
    router.push(`${adminRoutes.users}?groupId=${row.original.id}`);
  };

  return (
    <QueryContainer loading={loading} error={error}>
      <Box>
        <Text fontSize="xl" fontWeight="semibold">
          Groups for Test Outings
        </Text>
        <Box mb="10">
          <GroupTable table={table} handleSelectedRow={handleSelectedRow} />
        </Box>
      </Box>
    </QueryContainer>
  );
}

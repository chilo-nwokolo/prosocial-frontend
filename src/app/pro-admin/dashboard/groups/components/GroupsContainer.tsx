"use client";
import { Box, Text } from "@chakra-ui/react";
import GroupTable from "./GroupTable";
import { useQuery } from "@apollo/client";
import QueryContainer from "@/components/General/QueryContainer";
import { QUERY_GROUPS } from "../gql/queries";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { groupColumns } from "./GroupTableColumns";

export default function GroupsContainer() {
  const { data, loading, error } = useQuery(QUERY_GROUPS, {
    fetchPolicy: "cache-and-network",
  });

  const table = useReactTable({
    // @ts-ignore
    data: data?.groups || [],
    columns: groupColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);

  return (
    <QueryContainer loading={loading} error={error}>
      <Box>
        <Text fontSize="xl" fontWeight="semibold">
          Groups for Test Outings
        </Text>
        <Box>
          <GroupTable table={table} />
        </Box>
      </Box>
    </QueryContainer>
  );
}

"use client";
import { Box, Text } from "@chakra-ui/react";
import GroupTable from "./GroupTable";
import QueryContainer from "@/components/General/QueryContainer";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { groupColumns } from "./GroupTableColumns";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/utils/constants";
import { useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

export default function GroupsContainer() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  const [groups, setGroups] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchedGroups = localStorageService.getGroups();
    setGroups(fetchedGroups);
    setLoading(false);
  }, []);

  const table = useReactTable({
    // @ts-ignore
    data: groups || [],
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

import { columns as newColumns } from "../components/UserTableColumns";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ADMIN_USERS } from "../queries";
import { useDisclosure } from "@chakra-ui/react";
import { useFilterContext } from "./useFilterContext";

export default function useUsersAdminPage() {
  const [columnVisibility, setColumnVisibility] = useState({});
  const { filterProp, activeFilters } = useFilterContext();

  useEffect(() => {
    console.info({ filterProp });
    console.info({ activeFilters });
  }, [activeFilters, filterProp]);

  const { loading, data } = useQuery(QUERY_ADMIN_USERS, {
    variables: {
      input: {
        // affinities: {
        //   age_range_max: 0,
        //   age_range_min: 0,
        // },
      },
    },
  });

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    // @ts-ignore
    data: data?.adminQueryUsers || [],
    // @ts-ignore
    columns: useMemo(() => newColumns, []),
    state: {
      columnVisibility,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    debugTable: process.env.NODE_ENV === "development",
    getPaginationRowModel: getPaginationRowModel(),
  });

  const {
    isOpen: isCreateGroupModal,
    onOpen: openCreateGroupModal,
    onClose: closeCreateGroupModal,
  } = useDisclosure();

  return {
    table,
    data,
    loading,
    isCreateGroupModal,
    openCreateGroupModal,
    closeCreateGroupModal,
  } as const;
}

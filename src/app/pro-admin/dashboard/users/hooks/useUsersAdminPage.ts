import { columns as newColumns } from "../components/UserTableColumns";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ADMIN_USERS } from "../gql/queries";
import { useDisclosure } from "@chakra-ui/react";
import { useFilterContext } from "./useFilterContext";
import { DynamicQueryObject, adminQueryBuilder } from "@/utils/admin.utils";
import { useSearchParams } from "next/navigation";
import {
  FILTER_CATEGORY_KEYS,
  FILTER_PARENT_NAMES,
  FILTER_QUERY_KEYS,
  activeFilterHandler,
  updateFilterPropHandler,
} from "@/utils/admin.utils";

export default function useUsersAdminPage() {
  const [columnVisibility, setColumnVisibility] = useState({});
  const {
    filterProp,
    activeFilters,
    updateActiveFilters,
    updateFilterProp,
    updateGroupView,
  } = useFilterContext();
  const [query, setQuery] = useState<DynamicQueryObject>();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.info({ filterProp });
    console.info({ activeFilters });
    setQuery(adminQueryBuilder(filterProp, activeFilters));
  }, [activeFilters, filterProp]);

  const { loading, data } = useQuery(QUERY_ADMIN_USERS, {
    variables: {
      input: {
        ...query,
      },
    },
  });

  useEffect(() => {
    const groupId = searchParams.get("groupId");
    if (groupId) {
      updateActiveFilters(
        activeFilterHandler(FILTER_CATEGORY_KEYS.groupId, activeFilters),
      );
      updateFilterProp(
        updateFilterPropHandler(
          {
            parentName: FILTER_PARENT_NAMES.groupId,
            category: FILTER_CATEGORY_KEYS.groupId,
            filterProp: FILTER_QUERY_KEYS.groupId,
            value: groupId,
          },
          filterProp,
        ),
      );
      updateGroupView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [rowSelection, setRowSelection] = useState({});

  const table: any = useReactTable({
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
    updateActiveFilters,
    updateFilterProp,
    activeFilters,
    filterProp,
  } as const;
}

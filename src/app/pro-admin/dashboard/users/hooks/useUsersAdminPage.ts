import { columns as newColumns } from "../components/UserTableColumns";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
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
import localStorageService from "@/service/localStorage";

export default function useUsersAdminPage() {
  const [columnVisibility, setColumnVisibility] = useState({});
  const {
    filterProp,
    activeFilters,
    updateActiveFilters,
    updateFilterProp,
    updateGroupView,
    groupView,
  } = useFilterContext();
  const [query, setQuery] = useState<DynamicQueryObject>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ adminQueryUsers: any[] } | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    console.info({ filterProp });
    console.info({ activeFilters });
    setQuery(adminQueryBuilder(filterProp, activeFilters));
  }, [activeFilters, filterProp]);

  useEffect(() => {
    // Fetch users from localStorage
    setLoading(true);
    const users = localStorageService.adminQueryUsers({
      search: query?.search as string | undefined,
      groupId: query?.groupId as string | undefined,
    });
    setData({ adminQueryUsers: users });
    setLoading(false);
  }, [query]);

  useEffect(() => {
    const groupId = searchParams.get("groupId");
    if (groupView && !groupId) {
      // refresh page if group view is on but no group ID on the browser
      window.location.reload();
    }
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
      updateGroupView(groupId);
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

"use client";
import { Box } from "@chakra-ui/react";
import AdminModal from "@/app/pro-admin/components/AdminModal";
import CreateGroupModal from "@/app/pro-admin/dashboard/users/components/CreateGroupModal";
import FilterTable from "./FilterTable";

type Props = {
  table: any;
  data: any;
  loading: boolean;
  isCreateGroupModal: boolean;
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
      <FilterTable
        data={data}
        table={table}
        loading={loading}
        openCreateGroupModal={openCreateGroupModal}
      />
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

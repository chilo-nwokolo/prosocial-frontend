"use client";
import useUsersAdminPage from "../hooks/useUsersAdminPage";
import UsersTable from "@/app/pro-admin/components/UsersTable";

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
    <UsersTable
      table={table}
      data={data}
      loading={loading}
      isCreateGroupModal={isCreateGroupModal}
      openCreateGroupModal={openCreateGroupModal}
      closeCreateGroupModal={closeCreateGroupModal}
    />
  );
}

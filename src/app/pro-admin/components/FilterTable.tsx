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
  useDisclosure,
} from "@chakra-ui/react";
import TableColumnsFilterDropdown from "../dashboard/users/components/TableColumnsFilterDropdown";
import dynamic from "next/dynamic";
import PaginationData from "../dashboard/users/components/PaginationData";
import { useFilterContext } from "../dashboard/users/hooks/useFilterContext";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/utils/constants";
import useDownloadData from "../dashboard/users/hooks/useDownloadData";
import UserPreviewModal, { AdminUserType } from "./UserPreviewModal";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const handleDownload = useDownloadData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeUser, setActiveUser] = useState<AdminUserType | null>(null);

  useEffect(() => {
    if (activeUser) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser?.unique_id]);

  const handleClick = (user: AdminUserType) => {
    setActiveUser(user);
  };

  const handleClose = () => {
    onClose();
    setActiveUser(null);
  };

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
          {groupView.length ? (
            <Button
              onClick={() => router.push(`${adminRoutes.groups}/${groupView}`)}
            >
              View Feedback Info
            </Button>
          ) : (
            <>
              <Button
                onClick={openCreateGroupModal}
                // isDisabled={!table.getSelectedRowModel().flatRows.length}
              >
                Add to group
              </Button>
              <Button
                // isDisabled={!table.getSelectedRowModel().flatRows.length}
                onClick={handleDownload}
              >
                Download data as CSV
              </Button>
            </>
          )}
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
            <AdminTable table={table} handleClick={handleClick} />
            <PaginationData table={table} />
          </>
        )}
      </Box>
      <UserPreviewModal
        isOpen={isOpen}
        onClose={handleClose}
        userInView={activeUser}
      />
    </>
  );
}

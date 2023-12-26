"use client";
import AdminUserAccordion from "@/app/pro-admin/components/AdminUserAccordion";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import TableColumnsFilterDropdown from "./TableColumnsFilterDropdown";
import AdminTable from "./AdminTable";
import { defaultData, columns as newColumns } from "./UserTableColumns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";

export default function UsersPage() {
  const [data] = useState(() => [...defaultData]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns: newColumns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    debugTable: process.env.NODE_ENV === "development",
    debugHeaders: process.env.NODE_ENV === "development",
    debugColumns: process.env.NODE_ENV === "development",
  });

  return (
    <Box mt="4">
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
          <Text>13 Records</Text>
        </Box>
        <Flex gap="4">
          <Button>Add to group</Button>
          <Button>Download as CSV</Button>
        </Flex>
        <Box>
          <Button>Delete</Button>
        </Box>
      </Flex>
      <Box minH="1000px" mt="10px">
        <AdminTable table={table} />
      </Box>
    </Box>
  );
}

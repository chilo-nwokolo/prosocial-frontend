"use client";
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { AdminUserType } from "@/app/pro-admin/components/UserPreviewModal";
import { FaInfoCircle } from "react-icons/fa";

export default function AdminTable({
  table,
  handleClick,
}: {
  table: TanstackTable<AdminUserType>;
  // eslint-disable-next-line no-unused-vars
  handleClick: (e: any) => void;
}) {
  return (
    <div className="p-2">
      <div className="h-4" />
      <TableContainer>
        <Table colorScheme="blackAlpha">
          <Thead>
            {table.getHeaderGroups()?.map((headerGroup) => (
              <Tr key={headerGroup.id}>
                <>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      border="1px solid"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Th>
                  ))}
                </>
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id} cursor="pointer">
                <>
                  {row.getVisibleCells().map((cell) =>
                    cell.column.id === "name" ? (
                      <Td
                        key={cell.id}
                        border="1px solid"
                        onClick={() => handleClick(row.original)}
                      >
                        <Flex
                          alignItems="center"
                          gap={2}
                          justifyContent={"space-between"}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                          <FaInfoCircle />
                        </Flex>
                      </Td>
                    ) : (
                      <Td key={cell.id} border="1px solid">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    ),
                  )}
                </>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box my="6" />
    </div>
  );
}

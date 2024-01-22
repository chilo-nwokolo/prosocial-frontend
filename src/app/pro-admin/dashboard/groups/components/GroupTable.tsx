"use client";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Table as TanstackTable, flexRender } from "@tanstack/react-table";

export default function GroupTable({
  table,
  handleSelectedRow,
}: {
  table: TanstackTable<any>;
  // eslint-disable-next-line no-unused-vars
  handleSelectedRow: (row: any) => void;
}) {
  return (
    <TableContainer mt="4">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} border="1px solid">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              _hover={{ cursor: "pointer" }}
              key={row.id}
              onClick={() => handleSelectedRow(row)}
            >
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} border="1px solid">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

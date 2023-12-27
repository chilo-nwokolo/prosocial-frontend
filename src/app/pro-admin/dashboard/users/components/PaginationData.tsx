import { Query_Admin_UsersQuery } from "@/__generated__/graphql";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { Table as TanstackTable } from "@tanstack/react-table";

export default function PaginationData({
  table,
}: {
  table: TanstackTable<Query_Admin_UsersQuery["adminQueryUsers"]>;
}) {
  return (
    <Flex alignItems="center" gap="2">
      <Button
        variant="outline"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button>
      <Button
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button
        variant="outline"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </Button>
      <Button
        variant="outline"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </Button>
      <Flex alignItems="center" gap="1">
        <Text>Page</Text>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </Flex>
      <Flex alignItems="center" gap="1">
        <Text whiteSpace="nowrap">| Go to page:</Text>
        <Input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        />
      </Flex>
      <Select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        w="auto"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
    </Flex>
  );
}

import { Query_Admin_UsersQuery } from "@/__generated__/graphql";
import {
  Box,
  Button,
  Flex,
  ListItem,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";

export default function CreateGroupModal({
  table,
}: {
  table: Table<Query_Admin_UsersQuery["adminQueryUsers"]>;
}) {
  return (
    <Flex flexDir="column" gap="5">
      <Box
        border="1px solid"
        borderColor="#000"
        h="200px"
        maxH="200px"
        overflowY="auto"
      >
        <UnorderedList styleType="none" ml="0">
          {table.getSelectedRowModel().flatRows.map((l, i) => (
            <ListItem
              pl="2"
              py="2"
              key={l.id}
              bg={i % 2 === 0 ? "gray.100" : "#fff"}
            >
              {/* @ts-ignore */}
              {l?.original?.name}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box>
        <Textarea
          rows={10}
          borderRadius="none"
          borderColor="#000"
          border="1px solid"
        />
      </Box>
      <Box mx="auto">
        <Button>Save</Button>
      </Box>
    </Flex>
  );
}

import { Flex, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

type GroupsColumnsType = {
  id: string;
  name: string;
  outing_date?: any | null;
  note?: string | null | undefined;
  users?:
    | {
        __typename?: "User" | undefined;
        id: string;
        name: string;
        email: string;
      }[]
    | null
    | undefined;
};

const columnHelper = createColumnHelper<GroupsColumnsType>();

export const groupColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("users", {
    header: () => "Members",
    cell: (info) => {
      const users = info.row.original?.users || [];
      return users.map((member, i) => (
        <Text
          key={member?.id}
          bg={i % 2 === 0 ? "#ebdcdc" : "none"}
          pl="2"
          py="1.5"
        >
          {member?.name}
        </Text>
      ));
    },
  }),
  columnHelper.accessor("users.email", {
    header: () => "Emails",
    cell: (info) => {
      const users = info.row.original?.users || [];
      return users.map((user, i) => (
        <Text
          bg={i % 2 === 0 ? "#ebdcdc" : "none"}
          pl="2"
          py="1.5"
          key={user.email}
        >
          {user.email}
        </Text>
      ));
    },
  }),
  columnHelper.accessor("outing_date", {
    header: () => "Date Created",
    cell: (info) => info.renderValue() || "Jan 2024",
  }),
  columnHelper.accessor("note", {
    header: () => "Notes",
    cell: (info) => (
      <Flex w="200px">
        <Text whiteSpace="break-spaces">{info.renderValue()}</Text>
      </Flex>
    ),
  }),
  // columnHelper.accessor("feedback", {
  //   header: () => "Feedback",
  //   cell: (info) => info.renderValue(),
  // }),
  // columnHelper.accessor("groupInviteEmail", {
  //   header: () => "Group Invite Email",
  //   cell: (info) => {
  //     const value = info.getValue();
  //     if (value) {
  //       return "Email sent";
  //     }
  //     return <Button>Send Email</Button>;
  //   },
  // }),
];

import { Button, Flex, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

type GroupsColumnsType = {
  id: string;
  name: string;
  outing_date?: any | null;
  note?: string | null | undefined;
  feedback_received?: boolean;
  group_invite_status?: boolean;
  created_at?: Date;
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
  columnHelper.accessor("created_at", {
    header: () => "Date Created",
    cell: (info) => {
      const createdDate = new Date(
        info.row.original.created_at || "2024/01/01",
      );
      return <Text>{createdDate.toDateString()}</Text>;
    },
  }),
  columnHelper.accessor("note", {
    header: () => "Notes",
    cell: (info) => (
      <Flex w="200px">
        <Text whiteSpace="break-spaces">{info.renderValue()}</Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("feedback_received", {
    header: () => "Feedback",
    cell: (info) => {
      const value = info.getValue();
      if (value) {
        return "Received";
      }
      return "None received";
    },
  }),
  columnHelper.accessor("group_invite_status", {
    header: () => "Group Invite Email",
    cell: (info) => {
      const value = info.getValue();
      if (value) {
        return "Email sent";
      }
      return <Button>Send Email</Button>;
    },
  }),
];

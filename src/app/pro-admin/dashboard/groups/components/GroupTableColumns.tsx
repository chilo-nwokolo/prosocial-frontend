import { Button, Flex, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

type Group = {
  name: string;
  members: string[];
  emails: string[];
  dateCreated: string;
  notes: string;
  feedback: string;
  groupInviteEmail: boolean;
};

export const defaultGroupData: Group[] = [
  {
    name: "tanner",
    members: ["Linsley John", "Kingsley Michael"],
    emails: ["linsley@mail.com", "kingsley@gmail.com"],
    dateCreated: "Jan 2020",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue sem",
    feedback: "no feedback sha",
    groupInviteEmail: false,
  },
  {
    name: "Jemma",
    members: ["Jensley Rose", "Michael Scofield"],
    emails: ["jensley@mail.com", "michael@gmail.com"],
    dateCreated: "Jan 2020",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue sem",
    feedback: "no feedback sha",
    groupInviteEmail: true,
  },
];

const columnHelper = createColumnHelper<Group>();

export const groupColumns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("members", {
    header: () => "Members",
    cell: (info) => {
      return info.row.original.members.map((member, i) => (
        <Text
          key={member}
          bg={i % 2 === 0 ? "#ebdcdc" : "none"}
          pl="2"
          py="1.5"
        >
          {member}
        </Text>
      ));
    },
  }),
  columnHelper.accessor("emails", {
    header: () => "Emails",
    cell: (info) => {
      return info.row.original.emails.map((email, i) => (
        <Text bg={i % 2 === 0 ? "#ebdcdc" : "none"} pl="2" py="1.5" key={email}>
          {email}
        </Text>
      ));
    },
  }),
  columnHelper.accessor("dateCreated", {
    header: () => "Date Created",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("notes", {
    header: () => "Notes",
    cell: (info) => (
      <Flex w="200px">
        <Text whiteSpace="break-spaces">{info.renderValue()}</Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("feedback", {
    header: () => "Feedback",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("groupInviteEmail", {
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

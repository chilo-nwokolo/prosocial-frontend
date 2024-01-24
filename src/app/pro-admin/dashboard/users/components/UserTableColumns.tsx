import { Query_Admin_UsersQuery } from "@/__generated__/graphql";
import { Box, Checkbox } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper =
  createColumnHelper<Query_Admin_UsersQuery["adminQueryUsers"]>();

export const columns = [
  columnHelper.accessor("id", {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        {...{
          isChecked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          isChecked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: () => <span>Full Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("unique_id", {
    header: () => <span>UUID</span>,
    cell: (info) => <i>{info.renderValue() as string}</i>,
  }),
  columnHelper.accessor("dob", {
    header: () => <span>Age</span>,
    cell: (info) => (
      <Box>
        {/* @ts-ignore */}
        {new Date().getFullYear() - new Date(info.getValue()).getFullYear()}
      </Box>
    ),
  }),
  columnHelper.accessor("email", {
    header: () => <span>Email Address</span>,
  }),
  columnHelper.accessor("phone", {
    header: () => <span>Phone Number</span>,
  }),
  columnHelper.accessor("profile.level_of_education", {
    header: () => <span>Education</span>,
  }),
  columnHelper.accessor("profile.political_orientation", {
    header: () => <span>Political Orientation</span>,
  }),
  columnHelper.accessor("profile.gender", {
    header: () => <span>Gender</span>,
  }),
  columnHelper.accessor("profile.race", {
    header: () => <span>Race</span>,
  }),
  columnHelper.accessor("profile.relationship_status", {
    header: () => <span>Relationship Status</span>,
  }),
  columnHelper.accessor("profile.health_rating", {
    header: () => <span>Health Rating</span>,
  }),
  columnHelper.accessor("personalityScore.personalityBucketType.name", {
    header: () => <span>Big 5 Type</span>,
  }),
  columnHelper.accessor("question_responses", {
    header: () => <span>Questions Answered</span>,
    cell: (info) => {
      const questionResponses = info.row.original as any;
      return questionResponses?.question_responses?.length as string;
    },
  }),
  columnHelper.accessor("personalityScore.extroversion", {
    header: () => <span>Extroversion Score</span>,
  }),
  columnHelper.accessor("personalityScore.agreeableness", {
    header: () => <span>Agreeableness Score</span>,
  }),
  columnHelper.accessor("personalityScore.conscientiousness", {
    header: () => <span>Conscientiousness Score</span>,
  }),
  columnHelper.accessor("personalityScore.neuroticism", {
    header: () => <span>Neuroticism Score</span>,
  }),
  columnHelper.accessor("personalityScore.openness", {
    header: () => <span>Openness Score</span>,
  }),
  columnHelper.accessor("personalityScore.narcissism", {
    header: () => <span>Narcissism Score</span>,
  }),
];

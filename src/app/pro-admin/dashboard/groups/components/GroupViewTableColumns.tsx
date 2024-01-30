import { Checkbox, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { GroupDataType } from "../hooks/useGroupView";

const columnHelper = createColumnHelper<GroupDataType>();

export const groupViewColumns = [
  columnHelper.accessor("id", {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        {...{
          isChecked: table.getIsAllRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          isChecked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("receiversName", {
    header: "Receiver's name",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("connectionType", {
    header: () => "Connection Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("feedback", {
    header: () => "Feedback",
    cell: (info) => <Text whiteSpace="pre-line">{info.getValue()}</Text>,
  }),
];

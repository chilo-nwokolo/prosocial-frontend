import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuGroup,
  // MenuGroup,
  MenuItem,
  MenuList,
  Switch,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { Table as TanstackTable } from "@tanstack/react-table";
import { Query_Admin_UsersQuery } from "@/__generated__/graphql";

export const columnsList = [
  {
    title: "Affinities",
    data: [
      { id: 1, value: "Age", key: "dob" },
      { id: 2, value: "Education", key: "profile_level_of_education" },
      {
        id: 3,
        value: "Political Orientation",
        key: "profile_political_orientation",
      },
    ],
  },
  {
    title: "Group Distribution",
    data: [
      { id: 1, value: "Gender", key: "profile_gender" },
      { id: 2, value: "Race", key: "profile_race" },
      {
        id: 3,
        value: "Relationship Status",
        key: "profile_relationship_status",
      },
      { id: 4, value: "Health", key: "profile_health_rating" },
    ],
  },
  {
    title: "Big 5 Personality",
    data: [
      {
        id: 1,
        value: "Big 5 Type",
        key: "personalityScore_personalityBucketType.name",
      },
      // { id: 2, value: "# of Questions Answered", key: "questions_answered" },
      {
        id: 3,
        value: "Extroversion Score",
        key: "personalityScore_extroversion",
      },
      {
        id: 4,
        value: "Agreeableness score",
        key: "personalityScore_agreeableness",
      },
      {
        id: 5,
        value: "Conscientiousness score",
        key: "personalityScore_conscientiousness",
      },
      {
        id: 6,
        value: "Neuroticism Score",
        key: "personalityScore_neuroticism",
      },
      { id: 7, value: "Openness score", key: "personalityScore_openness" },
    ],
  },
  {
    title: "Narcissism - Social - Behavioural",
    data: [
      { id: 1, value: "Narcissism score", key: "personalityScore_narcissism" },
      // { id: 2, value: "Social beliefs score" },
      // { id: 3, value: "Behavioral score" },
    ],
  },
  // { title: "Interests", data: [{ id: 1, value: "Interests list" }] },
  // { title: "Availability", data: [{ id: 1, value: "Available times list" }] },
  // {
  //   title: "Feedback",
  //   data: [
  //     { id: 1, value: "Connection rating" },
  //     { id: 2, value: "Text feedback" },
  //   ],
  // },
];

// const toggleExcludedColumns = ["name"];

// const columnNameMap = {
//   id: "ID",
//   name: "Name",
//   unique_id: "UUID",
//   dob: "Age",
//   email: "Email",
//   profile_level_of_education: "Education",
//   profile_political_orientation: "Political Orientation",
//   profile_gender: "Gender",
//   profile_race: "Race",
//   profile_relationship_status: "Relationship Status",
//   profile_health_rating: "Health",
//   "personalityScore_personalityBucketType.name": "Big 5 Type",
//   personalityScore_extroversion: "Extroversion Score",
//   personalityScore_agreeableness: "Agreeableness score",
//   personalityScore_conscientiousness: "Conscientiousness score",
//   personalityScore_neuroticism: "Neuroticism Score",
//   personalityScore_openness: "Openness score",
//   personalityScore_narcissism: "Narcissism score",
//   select: "ID",
// };

export default function TableColumnsFilterDropdown({
  table,
}: {
  table: TanstackTable<Query_Admin_UsersQuery["adminQueryUsers"]>;
}) {
  return (
    <Flex
      gap="5"
      h="100px"
      alignItems="center"
      border="1px solid"
      borderColor="primary.100"
      px="4"
    >
      <Menu closeOnSelect={false}>
        <MenuButton width="full" as={Button} rightIcon={<FaChevronDown />}>
          Columns
        </MenuButton>
        <MenuList gap="10" maxH="45rem" overflowY="auto">
          {columnsList.map((res) => (
            <MenuGroup title={res.title} key={res.title}>
              {res.data.map((result) => {
                const columnKey = table.getColumn(result.key);
                return (
                  <MenuItem key={result.value}>
                    <FormControl display="flex" gap="6" alignItems="center">
                      <Switch
                        id={result.value}
                        isChecked={columnKey?.getIsVisible()}
                        onChange={columnKey?.getToggleVisibilityHandler()}
                      />
                      <FormLabel htmlFor={result.value} mb="0">
                        {result.value}
                      </FormLabel>
                    </FormControl>
                  </MenuItem>
                );
              })}
            </MenuGroup>
          ))}
          {/* {table.getAllLeafColumns().map((column) => {
            if (toggleExcludedColumns.includes(column.id)) return null;
            return (
              <MenuItem key={column.id} className="px-1">
                <FormControl display="flex" gap="6" alignItems="center">
                  <Switch
                    isChecked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  />
                  <FormLabel htmlFor={column.id} mb="0">
                    {columnNameMap[column.id as keyof typeof columnNameMap]}
                  </FormLabel>
                </FormControl>
              </MenuItem>
            );
          })} */}
        </MenuList>
      </Menu>
      <Button
        isDisabled={table.getIsAllColumnsVisible()}
        onClick={table.getToggleAllColumnsVisibilityHandler()}
      >
        Reset
      </Button>
    </Flex>
  );
}

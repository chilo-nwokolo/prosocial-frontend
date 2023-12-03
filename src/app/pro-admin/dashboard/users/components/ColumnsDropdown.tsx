import {
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

const columnsList = [
  {
    title: "Affinities",
    data: [
      { id: 1, value: "Age" },
      { id: 2, value: "Education" },
      { id: 3, value: "Political Orientation" },
    ],
  },
  {
    title: "Group Distribution",
    data: [
      { id: 1, value: "Gender" },
      { id: 2, value: "Race" },
      { id: 3, value: "Relationship Status" },
      { id: 4, value: "Health" },
    ],
  },
  {
    title: "Big 5 Personality",
    data: [
      { id: 1, value: "Big 5 Type" },
      { id: 2, value: "# of Questions Answered" },
      { id: 3, value: "Extroversion Score" },
      { id: 4, value: "Agreeableness score" },
      { id: 5, value: "Conscientiousness score" },
      { id: 6, value: "Neuroticism Score" },
      { id: 7, value: "Openness score" },
    ],
  },
  {
    title: "Narcissism - Social - Behavioural",
    data: [
      { id: 1, value: "Narcissism score" },
      { id: 2, value: "Social beliefs score" },
      { id: 3, value: "Behavioral score" },
    ],
  },
  { title: "Interests", data: [{ id: 1, value: "Interests list" }] },
  { title: "Availability", data: [{ id: 1, value: "Available times list" }] },
  {
    title: "Feedback",
    data: [
      { id: 1, value: "Connection rating" },
      { id: 2, value: "Text feedback" },
    ],
  },
];

export default function ColumnsDropdown() {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton width="full" as={Button} rightIcon={<FaChevronDown />}>
        Columns
      </MenuButton>
      <MenuList gap="10" maxH="45rem" overflowY="auto">
        {columnsList.map((res) => (
          <MenuItem key={res.title}>
            {res.data.map((result) => (
              <FormControl
                key={result.value}
                display="flex"
                gap="6"
                alignItems="center"
              >
                <Switch id={result.value} />
                <FormLabel htmlFor={result.value} mb="0">
                  {result.value}
                </FormLabel>
              </FormControl>
            ))}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

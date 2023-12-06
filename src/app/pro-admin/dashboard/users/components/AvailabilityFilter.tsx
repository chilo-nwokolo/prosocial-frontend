"use client";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import GroupCheckbox from "./GroupCheckbox";

const options = [
  { id: 1, title: "Morning \n(7am - 12pm)", value: "MORNING" },
  { id: 2, title: "Afternoon \n(12 - 5pm)", value: "AFTERNOON" },
  { id: 3, title: "Evening \n(5 - 9pm)", value: "EVENING" },
];

const weekdays = [
  { id: 1, day: "Monday", value: "MONDAY", options },
  { id: 2, day: "Tuesday", value: "TUESDAY", options },
  { id: 3, day: "Wednesday", value: "WEDNESDAY", options },
];

const weekdays2 = [
  { id: 4, day: "Thursday", value: "THURSDAY", options },
  { id: 5, day: "Friday", value: "FRIDAY", options },
];

const weekend = [
  { id: 1, day: "Saturday", value: "SATURDAY", options },
  { id: 2, day: "Sunday", value: "SUNDAY", options },
];

export default function AvailabilityFilter() {
  const [value, setValue] = useState("");

  return (
    <Flex>
      <Flex flexDir="column">
        <FormControl gap="5" display="flex" alignItems="center" mb="4">
          <Switch id="education" />
          <FormLabel htmlFor="education" mb="0">
            How do you want to view interests
          </FormLabel>
        </FormControl>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="column">
            <Radio value="1">Show all interests per user</Radio>
            <Radio value="2">Show only selected interests</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Box border="1px solid" borderColor="primary.100" w="full" p="5">
        <Text fontSize="lg" fontWeight="500">
          Availability
        </Text>
        <Flex gap="10">
          <Box>
            {weekdays.map((day) => (
              <GroupCheckbox key={day.id} parent={day.day} data={day.options} />
            ))}
          </Box>
          <Box>
            {weekdays2.map((day) => (
              <GroupCheckbox key={day.id} parent={day.day} data={day.options} />
            ))}
          </Box>
          <Box>
            {weekend.map((day) => (
              <GroupCheckbox key={day.id} parent={day.day} data={day.options} />
            ))}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

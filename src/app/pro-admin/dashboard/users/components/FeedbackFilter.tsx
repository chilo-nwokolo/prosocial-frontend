import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function FeedbackFilter() {
  const [value, setValue] = useState("");

  return (
    <Box>
      <Text>
        When you select feedback filters, users will be grouped into pairs
      </Text>
      <Flex mt="3" gap="20">
        <Flex flexDir="column">
          <FormControl gap="5" display="flex" alignItems="center" mb="4">
            <Switch id="feedbackLevel" />
            <FormLabel htmlFor="feedbackLevel" mb="0">
              How do you want to view interests
            </FormLabel>
          </FormControl>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="column">
              <Radio value="1">Show all pairs with connection feedback</Radio>
              <Radio value="2">Only show pairs with text feedback</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        <Flex flexDir="column">
          <FormControl gap="5" display="flex" alignItems="center" mb="4">
            <Switch id="feedbackType" />
            <FormLabel htmlFor="feedbackType" mb="0">
              Feedback type
            </FormLabel>
          </FormControl>
          <RadioGroup onChange={setValue} value={value}>
            <Stack spacing={5}>
              <Checkbox>All</Checkbox>
              <Checkbox>Positive Feedback</Checkbox>
              <Checkbox>Negative Feedback</Checkbox>
              <Checkbox>Didn&apos;t interact</Checkbox>
            </Stack>
          </RadioGroup>
        </Flex>
        <Flex flexDir="column">
          <FormControl gap="5" display="flex" alignItems="center" mb="4">
            <Switch id="outingDate" />
            <FormLabel htmlFor="outingDate" mb="0">
              Outing Date(s)
            </FormLabel>
          </FormControl>
          <Flex flexDir="column" gap="4">
            <Input type="date" />
            <Input type="date" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

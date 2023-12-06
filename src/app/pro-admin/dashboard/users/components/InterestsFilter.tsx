"use client";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const interests = [
  "I like to work on cars",
  "I like to do puzzles",
  "I am good at working independently",
  "I like to work in teams",
  "I am an ambitious person; I set goals for myself",
  "I like to organize things (files desks/offices)",
  "I like to build things",
  "I like to read about art and music",
  "I like to have clear instructions to follow",
  "I like to try to influence or persuade people",
  "I like to do experiments",
  "I like to teach or train people",
  "I like trying to help people solve their problems I like to take care of animals",
];

const interests2 = [
  "I wouldn’t mind working 8 hours per day in an once I like selling things",
  "I enjoy creative writing",
  "I enjoy science",
  "I am quick to take on new responsibilities",
  "I am interested in healing people",
  "I enjoy trying to figure out how things work",
  "I like putting things together or assembling things I am a creative person",
  "I pay attention to details",
  "I like to do filing or typing",
  "I like to analyze things (problems/situations)",
];

export default function InterestsFilter() {
  const [value, setValue] = useState("");
  return (
    <Flex flexDir="column">
      <Flex mb="5" gap="6">
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
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center" mb="4">
            <Switch id="interestOverlap" />
            <FormLabel htmlFor="interestOverlap" mb="0">
              Only show users with interest overlap range of
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="maximum-slider">Maximum</FormLabel>
            <Slider aria-label="maximum-slider" defaultValue={30}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        </Flex>
      </Flex>
      <Box>
        <Text fontSize="lg" fontWeight="500" mb="4">
          Interests
        </Text>
        <SimpleGrid columns={2}>
          <Flex flexDir="column" gap="3" flexWrap="wrap">
            {interests.map((int) => (
              <Checkbox key={int}>{int}</Checkbox>
            ))}
          </Flex>
          <Flex flexDir="column" gap="3" flexWrap="wrap">
            {interests2.map((int) => (
              <Checkbox key={int}>{int}</Checkbox>
            ))}
          </Flex>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

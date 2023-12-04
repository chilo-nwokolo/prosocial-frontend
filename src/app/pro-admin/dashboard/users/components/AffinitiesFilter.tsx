import {
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";

export default function AffinitiesFilter() {
  return (
    <SimpleGrid w="full" columns={3}>
      <Flex flexDir="column">
        <FormControl display="flex" alignItems="center">
          <Switch id="age-range" />
          <FormLabel htmlFor="age-range" mb="0">
            Age Range
          </FormLabel>
        </FormControl>
      </Flex>
      <Flex flexDir="column">
        <FormControl display="flex" alignItems="center">
          <Switch id="education" />
          <FormLabel htmlFor="education" mb="0">
            Education
          </FormLabel>
        </FormControl>
      </Flex>
      <Flex flexDir="column">
        <FormControl display="flex" alignItems="center">
          <Switch id="political-orientation" />
          <FormLabel htmlFor="political-orientation" mb="0">
            Political Orientation
          </FormLabel>
        </FormControl>
      </Flex>
    </SimpleGrid>
  );
}

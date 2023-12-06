import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
} from "@chakra-ui/react";

export default function AffinitiesFilter() {
  return (
    <SimpleGrid w="full" columns={3} spacing="5">
      <Flex flexDir="column">
        <FormControl display="flex" gap="3" alignItems="center">
          <Switch id="age-range" />
          <FormLabel htmlFor="age-range" mb="0">
            Age Range
          </FormLabel>
        </FormControl>
        <Flex flexDir="column" mt="5" gap="4">
          <FormControl>
            <FormLabel htmlFor="minimum-slider">Minimum</FormLabel>
            <Slider aria-label="minimum-slider" defaultValue={30}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
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
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch id="education" />
          <FormLabel htmlFor="education" mb="0">
            Education
          </FormLabel>
        </FormControl>
        <Select mt="5">
          <option value="elementary">Elementary or Middle School</option>
          <option value="highSchool">
            High school graduate/GED equivalent
          </option>
          <option value="someCollege">Some college</option>
          <option value="associate">Associate degree</option>
          <option value="bachelors">Bachelor&apos;s degree</option>
          <option value="graduate">Graduate or professional degree</option>
        </Select>
      </Flex>
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch id="political-orientation" />
          <FormLabel htmlFor="political-orientation" mb="0">
            Political Orientation
          </FormLabel>
        </FormControl>
        <Select mt="5">
          <option value="stronglyLiberal">Strongly Liberal</option>
          <option value="slightlyLiberal">Slightly Liberal</option>
          <option value="moderate">Moderate</option>
          <option value="slightlyConservative">Slightly conservative</option>
          <option value="stronglyConservative">Strongly Conservative</option>
        </Select>
      </Flex>
    </SimpleGrid>
  );
}

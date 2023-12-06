import {
  Box,
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
  Text,
} from "@chakra-ui/react";

const individualTraits = [
  "Extroversion score range",
  "Agreeableness score range",
  "Conscientiousness score range",
  "Neuroticism score range",
  "Openness score range",
];

export default function Big5Personality() {
  return (
    <Flex flexDir="column">
      <SimpleGrid w="full" columns={3} spacing="5">
        <Flex flexDir="column">
          <FormControl display="flex" gap="3" alignItems="center">
            <Switch id="age-range" />
            <FormLabel htmlFor="age-range" mb="0">
              Big 5 Type
            </FormLabel>
          </FormControl>
          <Select mt="5">
            <option value="all">All</option>
            <option value="explorer">Explorer</option>
            <option value="protector">Protector</option>
            <option value="listener">Listener</option>
            <option value="dependable">Dependable</option>
            <option value="acceptor">Acceptor</option>
            <option value="sage">Sage</option>
            <option value="companion">Companion</option>
            <option value="dutiful">Dutiful</option>
          </Select>
        </Flex>
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch id="questionsAnswered" />
            <FormLabel htmlFor="questionsAnswered" mb="0">
              Questions Answered
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
      </SimpleGrid>
      <Box border="1px solid" mt="5" p="5">
        <Text fontWeight="600" fontSize="lg">
          Individual Traits
        </Text>
        <Flex gap="5" mt="10">
          {individualTraits.map((trait) => (
            <Flex flexDir="column" key={trait}>
              <FormControl gap="4" display="flex" alignItems="center">
                <Switch id={trait} />
                <FormLabel htmlFor={trait} mb="0">
                  {trait}
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
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

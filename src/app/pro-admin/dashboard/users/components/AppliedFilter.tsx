import {
  Box,
  Flex,
  FormControl,
  FormLabel,
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

export default function AppliedFilter() {
  return (
    <Flex flexDir="column">
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

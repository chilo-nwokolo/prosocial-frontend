import {
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
} from "@chakra-ui/react";

const narcTraits = [
  "Narcissism range",
  "Social beliefs range",
  "Behavioral health range",
];

export default function NarcissismFilter() {
  return (
    <SimpleGrid columns={3} spacing="8">
      {narcTraits.map((trait) => (
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
    </SimpleGrid>
  );
}

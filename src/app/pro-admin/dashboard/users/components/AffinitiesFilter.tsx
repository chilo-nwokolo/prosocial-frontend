import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFilterContext } from "../hooks/useFilterContext";
import { FILTER_VALUES, activeFilterHandler } from "@/utils/admin.utils";

export default function AffinitiesFilter() {
  const [sliderValueMin, setSliderValueMin] = useState(0);
  const [sliderValueMax, setSliderValueMax] = useState(100);
  const { updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  return (
    <SimpleGrid w="full" columns={3} spacing="5">
      <Flex flexDir="column">
        <FormControl display="flex" gap="3" alignItems="center">
          <Switch
            id="age-range"
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(FILTER_VALUES.age, activeFilters),
              )
            }
            isChecked={activeFilters.includes(FILTER_VALUES.age)}
          />
          <FormLabel htmlFor="age-range" mb="0">
            Age Range
          </FormLabel>
        </FormControl>
        <Flex flexDir="column" mt="5" gap="8">
          <FormControl>
            <FormLabel htmlFor="minimum-slider">Minimum</FormLabel>
            <Slider
              aria-label="minimum-slider"
              defaultValue={sliderValueMin}
              onChange={(val) => {
                setSliderValueMin(val);
                updateFilterProp({
                  parentName: "affinities",
                  filterProp: "age_range_min",
                  value: val,
                });
              }}
            >
              <SliderMark
                value={sliderValueMin}
                textAlign="center"
                color="#000"
                mt="4"
                ml="-5"
                w="12"
              >
                {sliderValueMin}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="maximum-slider">Maximum</FormLabel>
            <Slider
              aria-label="maximum-slider"
              defaultValue={sliderValueMax}
              onChange={(val) => {
                setSliderValueMax(val);
                updateFilterProp({
                  parentName: "affinities",
                  filterProp: "age_range_max",
                  value: val,
                });
              }}
            >
              <SliderMark
                value={sliderValueMax}
                textAlign="center"
                color="#000"
                mt="4"
                ml="-5"
                w="12"
              >
                {sliderValueMax}
              </SliderMark>
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
          <Switch
            id="education"
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(FILTER_VALUES.education, activeFilters),
              )
            }
            isChecked={activeFilters.includes(FILTER_VALUES.education)}
          />
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
          <Switch
            id="political-orientation"
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(
                  FILTER_VALUES.politicalOrientation,
                  activeFilters,
                ),
              )
            }
            isChecked={activeFilters.includes(
              FILTER_VALUES.politicalOrientation,
            )}
          />
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

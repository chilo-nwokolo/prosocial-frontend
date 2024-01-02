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
import {
  FILTER_VALUES,
  activeFilterHandler,
  findFilterProp,
  updateFilterPropHandler,
} from "@/utils/admin.utils";
import {
  educationOptions,
  politicalOrientationOptions,
} from "@/features/intro/questions";

export default function AffinitiesFilter() {
  const { filterProp, updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  const [sliderValueMin, setSliderValueMin] = useState(
    (findFilterProp("age_range_min", filterProp) as number) || 0,
  );
  const [sliderValueMax, setSliderValueMax] = useState(
    (findFilterProp("age_range_max", filterProp) as number) || 100,
  );

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
                updateFilterProp(
                  updateFilterPropHandler(
                    {
                      parentName: "affinities",
                      category: "age",
                      filterProp: "age_range_min",
                      value: val,
                    },
                    filterProp,
                  ),
                );
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
                updateFilterProp(
                  updateFilterPropHandler(
                    {
                      parentName: "affinities",
                      category: "age",
                      filterProp: "age_range_max",
                      value: val,
                    },
                    filterProp,
                  ),
                );
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
        <Select
          mt="5"
          onChange={(e) => {
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: "affinities",
                  category: "education",
                  filterProp: "education",
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp("education", filterProp)}
        >
          <option value="">None</option>
          {educationOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
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
        <Select
          mt="5"
          onChange={(e) => {
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: "affinities",
                  category: "politicalOrientation",
                  filterProp: "political_orientation",
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp("politicalOrientation", filterProp)}
        >
          <option value="">None</option>
          {politicalOrientationOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </Flex>
    </SimpleGrid>
  );
}

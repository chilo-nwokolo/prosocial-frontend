import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { useFilterContext } from "../hooks/useFilterContext";
import {
  FILTER_QUERY_KEYS,
  FILTER_CATEGORY_KEYS,
  activeFilterHandler,
  findFilterProp,
  updateFilterPropHandler,
  FILTER_PARENT_NAMES,
} from "@/utils/admin.utils";
import {
  educationOptions,
  politicalOrientationOptions,
} from "@/features/intro/questions";
import FilterSlider from "./FilterSlider";

export default function AffinitiesFilter() {
  const { filterProp, updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  return (
    <SimpleGrid w="full" columns={3} spacing="5">
      {/* AGE RANGE */}
      <Flex flexDir="column">
        <FormControl display="flex" gap="3" alignItems="center">
          <Switch
            id="age-range"
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(FILTER_CATEGORY_KEYS.age, activeFilters),
              )
            }
            isChecked={activeFilters.includes(FILTER_CATEGORY_KEYS.age)}
          />
          <FormLabel htmlFor="age-range" mb="0">
            Age Range
          </FormLabel>
        </FormControl>
        <Flex flexDir="column" mt="5" gap="8">
          <FilterSlider
            title="Minimum"
            sliderValue={
              (findFilterProp(
                FILTER_QUERY_KEYS.ageRangeMin,
                filterProp,
              ) as number) || 0
            }
            onChange={(val) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.affinities,
                    category: FILTER_CATEGORY_KEYS.age,
                    filterProp: FILTER_QUERY_KEYS.ageRangeMin,
                    value: val,
                  },
                  filterProp,
                ),
              );
            }}
          />
          <FilterSlider
            title="Maximum"
            sliderValue={
              (findFilterProp(
                FILTER_QUERY_KEYS.ageRangeMax,
                filterProp,
              ) as number) || 100
            }
            onChange={(val) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.affinities,
                    category: FILTER_CATEGORY_KEYS.age,
                    filterProp: FILTER_QUERY_KEYS.ageRangeMax,
                    value: val,
                  },
                  filterProp,
                ),
              );
            }}
          />
        </Flex>
      </Flex>
      {/* EDUCATION */}
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch
            id="education"
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(
                  FILTER_CATEGORY_KEYS.education,
                  activeFilters,
                ),
              )
            }
            isChecked={activeFilters.includes(FILTER_CATEGORY_KEYS.education)}
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
                  parentName: FILTER_PARENT_NAMES.affinities,
                  category: FILTER_CATEGORY_KEYS.education,
                  filterProp: FILTER_QUERY_KEYS.education,
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp(FILTER_QUERY_KEYS.education, filterProp)}
        >
          <option value="">All</option>
          {educationOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </Flex>
      {/* POLITICAL ORIENTATION */}
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch
            id="political-orientation"
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(
                  FILTER_CATEGORY_KEYS.politicalOrientation,
                  activeFilters,
                ),
              )
            }
            isChecked={activeFilters.includes(
              FILTER_CATEGORY_KEYS.politicalOrientation,
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
                  parentName: FILTER_PARENT_NAMES.affinities,
                  category: FILTER_CATEGORY_KEYS.politicalOrientation,
                  filterProp: FILTER_QUERY_KEYS.politicalOrientation,
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp(
            FILTER_QUERY_KEYS.politicalOrientation,
            filterProp,
          )}
        >
          <option value="">All</option>
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

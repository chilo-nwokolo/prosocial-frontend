import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useFilterContext } from "../hooks/useFilterContext";
import {
  FILTER_CATEGORY_KEYS,
  FILTER_PARENT_NAMES,
  FILTER_QUERY_KEYS,
  activeFilterHandler,
  findFilterProp,
  updateFilterPropHandler,
} from "@/utils/admin.utils";
import FilterSlider from "./FilterSlider";
import DoubleRangeFilterComponent from "./DoubleRangeFilterComponent";

const individualTraits = [
  {
    title: "Extroversion score range",
    category: FILTER_CATEGORY_KEYS.extroversionScore,
    minValue: FILTER_QUERY_KEYS.extroversionScoreMin,
    maxValue: FILTER_QUERY_KEYS.extroversionScoreMax,
    defaultSliderMax: 16,
    defaultSliderMin: -16,
  },
  {
    title: "Agreeableness score range",
    category: FILTER_CATEGORY_KEYS.agreeablenessScore,
    minValue: FILTER_QUERY_KEYS.agreeablenessScoreMin,
    maxValue: FILTER_QUERY_KEYS.agreeablenessScoreMax,
    defaultSliderMax: 16,
    defaultSliderMin: -16,
  },
  {
    title: "Conscientiousness score range",
    category: FILTER_CATEGORY_KEYS.conscientiousnessScore,
    minValue: FILTER_QUERY_KEYS.conscientiousnessScoreMin,
    maxValue: FILTER_QUERY_KEYS.conscientiousnessScoreMax,
    defaultSliderMax: 16,
    defaultSliderMin: -16,
  },
  {
    title: "Neuroticism score range",
    category: FILTER_CATEGORY_KEYS.neuroticismScore,
    minValue: FILTER_QUERY_KEYS.neuroticismScoreMin,
    maxValue: FILTER_QUERY_KEYS.neuroticismScoreMax,
    defaultSliderMax: 22,
    defaultSliderMin: -22,
  },
  {
    title: "Openness score range",
    category: FILTER_CATEGORY_KEYS.opennessScore,
    minValue: FILTER_QUERY_KEYS.opennessScoreMin,
    maxValue: FILTER_QUERY_KEYS.opennessScoreMax,
    defaultSliderMax: 16,
    defaultSliderMin: -16,
  },
];

export const BUTTERFLY_TYPES = [
  "Explorer",
  "Protector",
  "Listener",
  "Dependable",
  "Acceptor",
  "Sage",
  "Companion",
  "Dutiful",
];

export default function Big5Personality() {
  const { filterProp, updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  return (
    <Flex flexDir="column">
      <SimpleGrid w="full" columns={3} spacing="5">
        {/* BIG 5 TYPE */}
        <Flex flexDir="column">
          <FormControl display="flex" gap="3" alignItems="center">
            <Switch
              id="bigFiveType"
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.bigFiveType,
              )}
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.bigFiveType,
                    activeFilters,
                  ),
                )
              }
            />
            <FormLabel htmlFor="age-range" mb="0">
              Big 5 Type
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.bigFivePersonality,
                    category: FILTER_CATEGORY_KEYS.bigFiveType,
                    filterProp: FILTER_QUERY_KEYS.butterflyType,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.butterflyType,
              filterProp,
            )}
          >
            <option value="">All</option>
            {BUTTERFLY_TYPES.map((type) => (
              <option value={type.toLowerCase()} key={type}>
                {type}
              </option>
            ))}
          </Select>
        </Flex>
        {/* QUESTIONS ANSWERED */}
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch
              id="questionsAnswered"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.questionsAnswered,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.questionsAnswered,
              )}
            />
            <FormLabel htmlFor="questionsAnswered" mb="0">
              Questions Answered
            </FormLabel>
          </FormControl>
          <Flex flexDir="column" mt="5" gap="6">
            <FilterSlider
              title="Minimum"
              sliderValue={
                (findFilterProp(
                  FILTER_QUERY_KEYS.questionsAnsweredMin,
                  filterProp,
                ) as number) || 0
              }
              onChange={(val) => {
                updateFilterProp(
                  updateFilterPropHandler(
                    {
                      parentName: FILTER_PARENT_NAMES.bigFivePersonality,
                      category: FILTER_CATEGORY_KEYS.questionsAnswered,
                      filterProp: FILTER_QUERY_KEYS.questionsAnsweredMin,
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
                  FILTER_QUERY_KEYS.questionsAnsweredMax,
                  filterProp,
                ) as number) || 100
              }
              onChange={(val) => {
                updateFilterProp(
                  updateFilterPropHandler(
                    {
                      parentName: FILTER_PARENT_NAMES.bigFivePersonality,
                      category: FILTER_CATEGORY_KEYS.questionsAnswered,
                      filterProp: FILTER_QUERY_KEYS.questionsAnsweredMax,
                      value: val,
                    },
                    filterProp,
                  ),
                );
              }}
            />
          </Flex>
        </Flex>
      </SimpleGrid>
      {/* INDIVIDUAL TRAITS */}
      <Box border="1px solid" mt="10" p="5">
        <Text fontWeight="600" fontSize="lg">
          Individual Traits
        </Text>
        <Flex gap="5" mt="10">
          {individualTraits.map((traits) => (
            <DoubleRangeFilterComponent
              key={traits.title}
              trait={traits.title}
              parentName={FILTER_PARENT_NAMES.bigFivePersonality}
              individualTraitCategory={traits.category}
              individualTraitValueMax={traits.maxValue}
              individualTraitValueMin={traits.minValue}
              defaultSliderMax={traits.defaultSliderMax}
              defaultSliderMin={traits.defaultSliderMin}
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

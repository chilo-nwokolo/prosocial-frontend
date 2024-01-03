import { Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import FilterSlider from "./FilterSlider";
import { useFilterContext } from "../hooks/useFilterContext";
import {
  FILTER_PARENT_NAMES,
  activeFilterHandler,
  findFilterProp,
  updateFilterPropHandler,
} from "@/utils/admin.utils";
import { useState } from "react";

export default function IndividualTraitsComponent({
  trait,
  individualTraitCategory,
  individualTraitValueMin,
  individualTraitValueMax,
}: {
  trait: string;
  individualTraitCategory: string;
  individualTraitValueMin: string;
  individualTraitValueMax: string;
}) {
  const { filterProp, updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  const [sliderValueMin, setSliderValueMin] = useState(
    (findFilterProp(individualTraitValueMin, filterProp) as number) || 0,
  );

  const [sliderValueMax, setSliderValueMax] = useState(
    (findFilterProp(individualTraitValueMax, filterProp) as number) || 100,
  );

  return (
    <Flex flexDir="column">
      <FormControl gap="4" display="flex" alignItems="center">
        <Switch
          id={trait}
          onChange={() =>
            updateActiveFilters(
              activeFilterHandler(individualTraitCategory, activeFilters),
            )
          }
          isChecked={activeFilters.includes(individualTraitCategory)}
        />
        <FormLabel htmlFor={trait} mb="0">
          {trait}
        </FormLabel>
      </FormControl>
      <Flex flexDir="column" mt="5" py="8" px="3" gap="8">
        <FilterSlider
          title="Minimum"
          onChange={(val) => {
            setSliderValueMin(val);
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: FILTER_PARENT_NAMES.bigFivePersonality,
                  category: individualTraitCategory,
                  filterProp: individualTraitValueMin,
                  value: val,
                },
                filterProp,
              ),
            );
          }}
          sliderValue={sliderValueMin}
        />
        <FilterSlider
          title="Maximum"
          onChange={(val) => {
            setSliderValueMax(val);
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: FILTER_PARENT_NAMES.bigFivePersonality,
                  category: individualTraitCategory,
                  filterProp: individualTraitValueMax,
                  value: val,
                },
                filterProp,
              ),
            );
          }}
          sliderValue={sliderValueMax}
        />
      </Flex>
    </Flex>
  );
}

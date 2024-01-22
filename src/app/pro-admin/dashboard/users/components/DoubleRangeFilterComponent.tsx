import { Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import FilterSlider from "./FilterSlider";
import { useFilterContext } from "../hooks/useFilterContext";
import {
  activeFilterHandler,
  findFilterProp,
  updateFilterPropHandler,
} from "@/utils/admin.utils";
import { useState } from "react";

export default function DoubleRangeFilterComponent({
  trait,
  individualTraitCategory,
  individualTraitValueMin,
  individualTraitValueMax,
  parentName,
  defaultSliderMax = 100,
  defaultSliderMin = 0,
}: {
  trait: string;
  individualTraitCategory: string;
  individualTraitValueMin: string;
  individualTraitValueMax: string;
  parentName: string;
  defaultSliderMin?: number;
  defaultSliderMax?: number;
}) {
  const { filterProp, updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  const [sliderValueMin, setSliderValueMin] = useState(
    (findFilterProp(individualTraitValueMin, filterProp) as number) ||
      defaultSliderMin,
  );

  const [sliderValueMax, setSliderValueMax] = useState(
    (findFilterProp(individualTraitValueMax, filterProp) as number) ||
      defaultSliderMax,
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
                  parentName,
                  category: individualTraitCategory,
                  filterProp: individualTraitValueMin,
                  value: val,
                },
                filterProp,
              ),
            );
          }}
          min={sliderValueMin}
          max={sliderValueMax}
          sliderValue={sliderValueMin}
        />
        <FilterSlider
          title="Maximum"
          onChange={(val) => {
            setSliderValueMax(val);
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName,
                  category: individualTraitCategory,
                  filterProp: individualTraitValueMax,
                  value: val,
                },
                filterProp,
              ),
            );
          }}
          min={sliderValueMin}
          max={sliderValueMax}
          sliderValue={sliderValueMax}
        />
      </Flex>
    </Flex>
  );
}

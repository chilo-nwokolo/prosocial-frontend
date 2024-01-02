import {
  genderOptions,
  healthRatingOptions,
  raceOptions,
  relationshipStatusOptions,
} from "@/features/intro/questions";
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
  FILTER_VALUES,
  activeFilterHandler,
  findFilterProp,
  updateFilterPropHandler,
} from "@/utils/admin.utils";

export default function GroupDistributionFilter() {
  const { filterProp, updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  return (
    <SimpleGrid w="full" columns={4} spacing="5">
      {/* GENDER */}
      <Flex flexDir="column">
        <FormControl display="flex" gap="3" alignItems="center">
          <Switch
            id="gender"
            isChecked={activeFilters.includes(FILTER_VALUES.gender)}
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(FILTER_VALUES.gender, activeFilters),
              )
            }
          />
          <FormLabel htmlFor="gender" mb="0">
            Gender
          </FormLabel>
        </FormControl>
        <Select
          mt="5"
          onChange={(e) => {
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: "group_distribution",
                  category: "gender",
                  filterProp: "gender",
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp("gender", filterProp)}
        >
          <option value="">All</option>
          {genderOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </Flex>
      {/* RACE */}
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch
            id="race"
            isChecked={activeFilters.includes(FILTER_VALUES.race)}
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(FILTER_VALUES.race, activeFilters),
              )
            }
          />
          <FormLabel htmlFor="race" mb="0">
            Race
          </FormLabel>
        </FormControl>
        <Select
          mt="5"
          onChange={(e) => {
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: "group_distribution",
                  category: "race",
                  filterProp: "race",
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp("race", filterProp)}
        >
          <option value="">All</option>
          {raceOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </Flex>
      {/* RELATIONSHIP STATUS */}
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch
            id="relationshipStatus"
            isChecked={activeFilters.includes(FILTER_VALUES.relationshipStatus)}
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(
                  FILTER_VALUES.relationshipStatus,
                  activeFilters,
                ),
              )
            }
          />
          <FormLabel htmlFor="relationshipStatus" mb="0">
            Relationship Status
          </FormLabel>
        </FormControl>
        <Select
          mt="5"
          onChange={(e) => {
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: "group_distribution",
                  category: "relationshipStatus",
                  filterProp: "relationship_status",
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp("relationship_status", filterProp)}
        >
          <option value="">All</option>
          {relationshipStatusOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </Flex>
      {/* HEALTH STATUS */}
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch
            id="healthStatus"
            isChecked={activeFilters.includes(FILTER_VALUES.healthStatus)}
            onChange={() =>
              updateActiveFilters(
                activeFilterHandler(FILTER_VALUES.healthStatus, activeFilters),
              )
            }
          />
          <FormLabel htmlFor="healthStatus" mb="0">
            Health
          </FormLabel>
        </FormControl>
        <Select
          mt="5"
          onChange={(e) => {
            updateFilterProp(
              updateFilterPropHandler(
                {
                  parentName: "group_distribution",
                  category: FILTER_VALUES.healthStatus,
                  filterProp: "health",
                  value: e.target.value,
                },
                filterProp,
              ),
            );
          }}
          defaultValue={findFilterProp(FILTER_VALUES.healthStatus, filterProp)}
        >
          <option value="">All</option>
          {healthRatingOptions.map((option) => (
            <option value={option.value} key={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </Flex>
    </SimpleGrid>
  );
}

import { FilterProperties } from "@/app/pro-admin/dashboard/users/hooks/useFilterContext";

export const FILTER_VALUES = {
  age: "age",
  education: "education",
  politicalOrientation: "politicalOrientation",
};

// eslint-disable-next-line no-unused-vars
const filterParentChildRelationship = {
  affinities: ["age", "education", "politicalOrientation"],
  groupDistribution: [],
};

export const activeFilterHandler = (name: string, activeFilters: string[]) => {
  const foundId = activeFilters.indexOf(name);
  const newFilters = [...activeFilters];

  if (foundId >= 0) {
    newFilters.splice(foundId, 1);
    return newFilters;
  }
  newFilters.push(name);
  return newFilters;
};

export const adminQueryBuilder = (
  filterProperties: FilterProperties,
  activeFilters: string[],
) => {
  if (!activeFilters) return {};
};

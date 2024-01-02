import { FilterProperties } from "@/app/pro-admin/dashboard/users/hooks/useFilterContext";

export interface DynamicQueryObject {
  [key: string]: Record<string, any>;
}

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

export const updateFilterPropHandler = (
  property: FilterProperties,
  filterProp: FilterProperties[],
) => {
  const foundId = filterProp.findIndex(
    (prop) => prop.filterProp === property.filterProp,
  );

  const newFilters = [...filterProp];

  if (foundId >= 0) {
    newFilters.splice(foundId, 1);
    newFilters.push(property);
    return newFilters;
  }
  newFilters.push(property);
  return newFilters;
};

export const findFilterProp = (
  name: string,
  filterProp: FilterProperties[],
) => {
  const found = filterProp.find((prop) => prop.filterProp === name);
  return found?.value;
};

export const adminQueryBuilder = (
  filterProperties: FilterProperties[],
  activeFilters: string[],
) => {
  if (!activeFilters) return {};
  const finalQuery: DynamicQueryObject = {};

  for (const filter of filterProperties) {
    const { parentName, category, filterProp, value } = filter;
    if (!activeFilters.includes(category)) continue;
    if (!finalQuery[parentName]) {
      finalQuery[parentName] = { [filterProp]: value };
    } else {
      const initialData = finalQuery[parentName];
      const finished = { ...initialData, [filterProp]: value };
      finalQuery[parentName] = finished;
    }
  }
  return finalQuery;
};

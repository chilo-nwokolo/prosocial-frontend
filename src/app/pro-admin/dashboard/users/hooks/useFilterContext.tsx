import { ReactNode, createContext, useContext, useState } from "react";

export type FilterProperties = {
  parentName: string;
  filterProp: string;
  value: string | number;
};

type FilterObject = {
  [key: string]: any;
};

type FilterContextType = {
  filterProp: FilterProperties;
  updateFilterProp: ({
    // eslint-disable-next-line no-unused-vars
    parentName,
    // eslint-disable-next-line no-unused-vars
    filterProp,
    // eslint-disable-next-line no-unused-vars
    value,
  }: {
    parentName: string;
    filterProp: string;
    value: string | number;
  }) => void;
  activeFilters: string[];
  // eslint-disable-next-line no-unused-vars
  updateActiveFilters: (activeFilters: string[]) => void;
  filterInput: FilterObject;
  // eslint-disable-next-line no-unused-vars
  updateFilterInput: (input: FilterObject) => void;
};

const FilterDataContext = createContext<FilterContextType>({
  filterProp: { parentName: "", filterProp: "", value: "" },
  updateFilterProp: () => null,
  activeFilters: [],
  updateActiveFilters: () => null,
  filterInput: [],
  updateFilterInput: () => null,
});

export default function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filterProp, setFilterProp] = useState<any>();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filterInput, setFilterInput] = useState<any>();

  return (
    <>
      {/** @ts-ignore */}
      <FilterDataContext.Provider
        value={{
          filterProp,
          updateFilterProp: setFilterProp,
          activeFilters,
          updateActiveFilters: setActiveFilters,
          filterInput,
          updateFilterInput: setFilterInput,
        }}
      >
        {children}
      </FilterDataContext.Provider>
    </>
  );
}

export const useFilterContext = () => {
  const { filterProp, updateFilterProp, activeFilters, updateActiveFilters } =
    useContext(FilterDataContext);
  return { filterProp, updateFilterProp, activeFilters, updateActiveFilters };
};

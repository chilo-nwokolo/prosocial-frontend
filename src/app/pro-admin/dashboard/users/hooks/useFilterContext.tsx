import { ReactNode, createContext, useContext, useState } from "react";

export type FilterProperties = {
  parentName: string;
  category: string;
  filterProp: string;
  value: string | number;
};

type FilterContextType = {
  filterProp: FilterProperties[];
  // eslint-disable-next-line no-unused-vars
  updateFilterProp: (properties: FilterProperties[]) => void;
  activeFilters: string[];
  // eslint-disable-next-line no-unused-vars
  updateActiveFilters: (activeFilters: string[]) => void;
};

const FilterDataContext = createContext<FilterContextType>({
  filterProp: [{ parentName: "", filterProp: "", value: "", category: "" }],
  updateFilterProp: () => null,
  activeFilters: [],
  updateActiveFilters: () => null,
});

export default function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filterProp, setFilterProp] = useState<FilterProperties[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  return (
    <>
      <FilterDataContext.Provider
        value={{
          filterProp,
          updateFilterProp: setFilterProp,
          activeFilters,
          updateActiveFilters: setActiveFilters,
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

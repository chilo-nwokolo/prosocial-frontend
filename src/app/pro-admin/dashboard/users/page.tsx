"use client";
import { Box, Text } from "@chakra-ui/react";
import UsersPage from "./components/UsersPage";
import FilterContextProvider from "./hooks/useFilterContext";
import { Suspense } from "react";
import FallbackComponent from "@/components/General/FallbackComponent";

export default function AdminUsersPage() {
  return (
    <Box>
      <Text as="h1" fontWeight="semibold" fontSize="2xl">
        Users Data
      </Text>
      <Suspense fallback={<FallbackComponent />}>
        <FilterContextProvider>
          <UsersPage />
        </FilterContextProvider>
      </Suspense>
    </Box>
  );
}

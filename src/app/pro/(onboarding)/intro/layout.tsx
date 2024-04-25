"use client";
import { Box } from "@chakra-ui/react";
import { featureFlag } from "@/utils/helpers";
import NavBar from "@/components/General/NavBar";
import useScrollToTop from "@/hooks/useScrollToTop";

export default function ProIntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollToTop();
  return (
    <Box as="main" maxWidth="lg" minWidth="250px" mx="auto">
      <NavBar />
      <Box
        as="section"
        border={featureFlag("production") ? "none" : "1px solid"}
        borderColor={featureFlag("production") ? "none" : "gray.300"}
        overflowY="auto"
        px="6"
        pt="10"
        pb="4"
        mt="14"
        minH="100vh"
      >
        {children}
      </Box>
    </Box>
  );
}

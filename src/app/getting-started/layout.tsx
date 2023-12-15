import { featureFlag } from "@/utils/helpers";
import { Box } from "@chakra-ui/react";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="section"
      border={featureFlag("production") ? "none" : "1px solid"}
      borderColor={featureFlag("production") ? "none" : "gray.300"}
      minH="100vh"
      maxWidth="lg"
      minWidth="xs"
      mx="auto"
      overflowY="auto"
      px="6"
      py="4"
    >
      {children}
    </Box>
  );
}

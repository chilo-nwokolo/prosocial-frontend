// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            position: "top-right",
            duration: 3000,
            isClosable: true,
          },
        }}
      >
        {children}
        <ProgressBar
          height="6px"
          color="#f95c47"
          options={{ showSpinner: true }}
          shallowRouting
        />
      </ChakraProvider>
    </CacheProvider>
  );
}

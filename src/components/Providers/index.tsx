// app/providers.tsx
"use client";

import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "@/service";
import { theme } from "@/styles/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
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
        </ChakraProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}

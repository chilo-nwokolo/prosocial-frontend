import { CodegenConfig } from "@graphql-codegen/cli";

// GraphQL codegen is no longer used since the app now uses localStorage
// This file is kept for reference but the schema URL is a placeholder
const BASE_URL = "https://placeholder-not-used.com/graphql";

const config: CodegenConfig = {
  schema: BASE_URL,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;

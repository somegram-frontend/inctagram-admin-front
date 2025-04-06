import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.gql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/shared/configs/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;

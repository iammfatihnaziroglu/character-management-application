import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        {
          add: {
            content:
              "import { TypedDocumentString } from '../lib/typed-document-string';",
          },
        },
        {
          'typescript-operations': {
            onlyOperationTypes: true,
            documentMode: 'string',
          },
        },
        {
          'typescript-react-query': {
            reactQueryVersion: 5,
          },
        },
      ],
      config: {
        fetcher: {
          func: '../lib/graphql-fetcher#fetcher',
          isReactHook: false,
        },
      },
    },
  },
};

export default config;

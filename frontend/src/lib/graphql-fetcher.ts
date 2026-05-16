import type { RequestDocument } from 'graphql-request';
import { graphqlClient } from './graphql-client';

export function fetcher<TData, TVariables extends Record<string, unknown>>(
  document: RequestDocument,
  variables?: TVariables,
) {
  return () => {
    if (variables === undefined) {
      return graphqlClient.request<TData>(document);
    }
    return graphqlClient.request<TData>(document, variables);
  };
}

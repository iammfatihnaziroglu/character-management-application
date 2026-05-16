/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentString } from '../lib/typed-document-string';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '../lib/graphql-fetcher';
export type CharacterFilterInput = {
  gender?: CharacterGender | null | undefined;
  search?: string | null | undefined;
  status?: CharacterStatus | null | undefined;
};

export type CharacterGender =
  | 'FEMALE'
  | 'MALE'
  | 'UNKNOWN';

export type CharacterStatus =
  | 'ALIVE'
  | 'DEAD'
  | 'UNKNOWN';

export type GetCharactersQueryVariables = Exact<{
  filter?: CharacterFilterInput | null | undefined;
}>;


export type GetCharactersQuery = { characters: Array<{ id: string, image: string, name: string, status: CharacterStatus, gender: CharacterGender, description: string }> };



export const GetCharactersDocument = new TypedDocumentString(`
    query GetCharacters($filter: CharacterFilterInput) {
  characters(filter: $filter) {
    id
    image
    name
    status
    gender
    description
  }
}
    `);

export const useGetCharactersQuery = <
      TData = GetCharactersQuery,
      TError = unknown
    >(
      variables?: GetCharactersQueryVariables,
      options?: Omit<UseQueryOptions<GetCharactersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCharactersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCharactersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCharacters'] : ['GetCharacters', variables],
    queryFn: fetcher<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, variables),
    ...options
  }
    )};

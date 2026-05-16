'use client';

import { Suspense } from 'react';
import { useQueryState } from 'nuqs';
import { CharacterFilters } from '@/components/character-filters';
import { CharacterGrid } from '@/components/character-grid';
import {
  useGetCharactersQuery,
  type CharacterGender,
  type CharacterStatus,
} from '@/graphql/generated';
import {
  genderParser,
  searchParser,
  statusParser,
} from '@/lib/character-search-params';

function HomeContent() {
  const [status] = useQueryState('status', statusParser);
  const [gender] = useQueryState('gender', genderParser);
  const [search] = useQueryState('search', searchParser);

  const filter = {
    status: (status as CharacterStatus) || undefined,
    gender: (gender as CharacterGender) || undefined,
    search: search?.trim() || undefined,
  };

  const { data, isLoading, isError, error } = useGetCharactersQuery(
    { filter },
    { queryKey: ['GetCharacters', filter] },
  );

  const characters = data?.characters ?? [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Characters
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Filter by status, gender, or search — results come from the API.
        </p>
      </header>

      <CharacterFilters />

      {isLoading && (
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Loading characters…
        </p>
      )}

      {isError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
          {error instanceof Error ? error.message : 'Failed to load characters.'}
        </p>
      )}

      {!isLoading && !isError && characters.length === 0 && (
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          No characters match your filters.
        </p>
      )}

      {!isLoading && !isError && characters.length > 0 && (
        <CharacterGrid characters={characters} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-10 text-center text-zinc-600 dark:text-zinc-400">
          Loading…
        </p>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

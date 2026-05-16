'use client';

import { useQueryState } from 'nuqs';
import {
  genderParser,
  searchParser,
  statusParser,
} from '@/lib/character-search-params';

export function CharacterFilters() {
  const [search, setSearch] = useQueryState('search', searchParser);
  const [status, setStatus] = useQueryState('status', statusParser);
  const [gender, setGender] = useQueryState('gender', genderParser);

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      <label className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Search
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
          placeholder="Name or description…"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </label>
      <label className="flex w-full flex-col gap-1.5 sm:w-40">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Status
        </span>
        <select
          value={status ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            setStatus(
              value === 'ALIVE' || value === 'DEAD' || value === 'UNKNOWN'
                ? value
                : null,
            );
          }}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
        >
          <option value="">All</option>
          <option value="ALIVE">Alive</option>
          <option value="DEAD">Dead</option>
          <option value="UNKNOWN">Unknown</option>
        </select>
      </label>
      <label className="flex w-full flex-col gap-1.5 sm:w-40">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Gender
        </span>
        <select
          value={gender ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            setGender(
              value === 'MALE' || value === 'FEMALE' || value === 'UNKNOWN'
                ? value
                : null,
            );
          }}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
        >
          <option value="">All</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="UNKNOWN">Unknown</option>
        </select>
      </label>
    </div>
  );
}

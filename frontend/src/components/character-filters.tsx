'use client';

import { useQueryState } from 'nuqs';
import { FilterSelect } from '@/components/filter-select';
import {
  genderParser,
  searchParser,
  statusParser,
} from '@/lib/character-search-params';

const inputClassName =
  'rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:hover:border-zinc-500';

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'ALIVE', label: 'Alive' },
  { value: 'DEAD', label: 'Dead' },
  { value: 'UNKNOWN', label: 'Unknown' },
] as const;

const genderOptions = [
  { value: '', label: 'All' },
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'UNKNOWN', label: 'Unknown' },
] as const;

export function CharacterFilters() {
  const [search, setSearch] = useQueryState('search', searchParser);
  const [status, setStatus] = useQueryState('status', statusParser);
  const [gender, setGender] = useQueryState('gender', genderParser);

  return (
    <div className="relative z-20 flex w-full flex-col gap-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 sm:flex-row sm:flex-wrap sm:items-end dark:border-zinc-800 dark:bg-zinc-900/40">
      <label className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Search
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
          placeholder="Name or description…"
          className={inputClassName}
        />
      </label>
      <FilterSelect
        label="Status"
        value={status}
        options={[...statusOptions]}
        onChange={(value) =>
          setStatus(
            value === 'ALIVE' || value === 'DEAD' || value === 'UNKNOWN'
              ? value
              : null,
          )
        }
        className="w-full sm:w-44"
      />
      <FilterSelect
        label="Gender"
        value={gender}
        options={[...genderOptions]}
        onChange={(value) =>
          setGender(
            value === 'MALE' || value === 'FEMALE' || value === 'UNKNOWN'
              ? value
              : null,
          )
        }
        className="w-full sm:w-44"
      />
    </div>
  );
}


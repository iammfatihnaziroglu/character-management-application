import { Suspense } from 'react';
import { CharacterPageClient } from '@/components/character-page-client';

export default function Home() {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-10 text-center text-zinc-600 dark:text-zinc-400">
          Loading…
        </p>
      }
    >
      <CharacterPageClient />
    </Suspense>
  );
}

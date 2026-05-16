import Image from 'next/image';
import type { GetCharactersQuery } from '@/graphql/generated';

type Character = GetCharactersQuery['characters'][number];

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {character.name}
        </h2>
        <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide">
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            {character.status}
          </span>
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">
            {character.gender}
          </span>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {character.description}
        </p>
      </div>
    </article>
  );
}

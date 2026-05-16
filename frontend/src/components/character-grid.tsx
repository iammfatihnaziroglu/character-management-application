import type { GetCharactersQuery } from '@/graphql/generated';
import { CharacterCard } from '@/components/character-card';

type CharacterGridProps = {
  characters: GetCharactersQuery['characters'];
};

export function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          priority={index === 0}
        />
      ))}
    </div>
  );
}

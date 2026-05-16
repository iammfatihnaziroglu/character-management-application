import { Args, Query, Resolver } from '@nestjs/graphql';
import { Character } from './character.entity';
import { CharacterService } from './character.service';
import { CharacterFilterInput } from './dto/character-filter.input';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => [Character], { name: 'characters' })
  characters(
    @Args('filter', { type: () => CharacterFilterInput, nullable: true })
    filter?: CharacterFilterInput,
  ): Promise<Character[]> {
    return this.characterService.findAll(filter);
  }
}

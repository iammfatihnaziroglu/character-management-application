import { Module } from '@nestjs/common';
import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';

@Module({
  providers: [CharacterService, CharacterResolver],
})
export class CharacterModule {}

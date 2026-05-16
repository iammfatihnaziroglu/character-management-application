import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  CharacterGender,
  CharacterStatus,
} from '@prisma/client';

registerEnumType(CharacterStatus, { name: 'CharacterStatus' });
registerEnumType(CharacterGender, { name: 'CharacterGender' });

@ObjectType()
export class Character {
  @Field(() => ID)
  id: string;

  @Field()
  image: string;

  @Field()
  name: string;

  @Field(() => CharacterStatus)
  status: CharacterStatus;

  @Field(() => CharacterGender)
  gender: CharacterGender;

  @Field()
  description: string;
}

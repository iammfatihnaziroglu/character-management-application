import { Field, InputType } from '@nestjs/graphql';
import {
  CharacterGender,
  CharacterStatus,
} from '../../../generated/prisma/client';

@InputType()
export class CharacterFilterInput {
  @Field(() => CharacterStatus, { nullable: true })
  status?: CharacterStatus;

  @Field(() => CharacterGender, { nullable: true })
  gender?: CharacterGender;

  @Field(() => String, { nullable: true })
  search?: string;
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Character } from './character.entity';
import { CharacterFilterInput } from './dto/character-filter.input';

@Injectable()
export class CharacterService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter?: CharacterFilterInput): Promise<Character[]> {
    const where: Prisma.CharacterWhereInput = {};

    if (filter?.status) {
      where.status = filter.status;
    }
    if (filter?.gender) {
      where.gender = filter.gender;
    }

    const term = filter?.search?.trim();
    if (term) {
      where.OR = [
        { name: { contains: term } },
        { description: { contains: term } },
      ];
    }

    return this.prisma.character.findMany({ where });
  }
}

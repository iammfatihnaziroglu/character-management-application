import {
  CharacterGender,
  CharacterStatus,
  PrismaClient,
} from '@prisma/client';

/**
 * image alanı yalnızca harici URL (string) tutar — upload / dosya depolama yok.
 * Avatarlar: https://rickandmortyapi.com (görevdeki enumlarla uyumlu evren)
 */
const avatar = (apiCharacterId: number) =>
  `https://rickandmortyapi.com/api/character/avatar/${apiCharacterId}.jpeg`;

const prisma = new PrismaClient();

const characters = [
  {
    name: 'Rick Sanchez',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.MALE,
    description:
      'Genius scientist obsessed with portal travel and interdimensional adventures.',
    image: avatar(1),
  },
  {
    name: 'Morty Smith',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.MALE,
    description:
      'Anxious teenager often dragged into dangerous missions across the multiverse.',
    image: avatar(2),
  },
  {
    name: 'Summer Smith',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.FEMALE,
    description:
      'Confident older sister who balances high school life with cosmic chaos.',
    image: avatar(3),
  },
  {
    name: 'Beth Smith',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.FEMALE,
    description:
      'Horse surgeon and mother trying to keep her family grounded amid absurdity.',
    image: avatar(4),
  },
  {
    name: 'Jerry Smith',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.MALE,
    description:
      'Insecure father who desperately wants respect at home and at work.',
    image: avatar(5),
  },
  {
    name: 'Birdperson',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.UNKNOWN,
    description:
      'Honorable avian warrior and old friend lost in a tragic wedding ambush.',
    image: avatar(47),
  },
  {
    name: 'Squanchy',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.UNKNOWN,
    description:
      'Party-loving squanch who frequents wild intergalactic celebrations.',
    image: avatar(331),
  },
  {
    name: 'Mr. Poopybutthole',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.MALE,
    description:
      'Polite family friend who somehow always knows when tragedy is coming.',
    image: avatar(244),
  },
  {
    name: 'Scary Terry',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.MALE,
    description:
      'Nightmare ruler who shouts catchphrases while chasing targets through dreams.',
    image: avatar(306),
  },
  {
    name: 'Unity',
    status: CharacterStatus.UNKNOWN,
    gender: CharacterGender.UNKNOWN,
    description:
      'Hive-mind entity that once dated Rick and absorbed entire planetary populations.',
    image: avatar(372),
  },
  {
    name: 'Evil Morty',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.MALE,
    description:
      'Calculating villain with an eyepatch plotting revenge against the Citadel.',
    image: avatar(118),
  },
  {
    name: 'Tammy Gueterman',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.FEMALE,
    description:
      'Undercover agent who revealed herself as part of a deadly zombie conspiracy.',
    image: avatar(343),
  },
  {
    name: 'Noob Noob',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.MALE,
    description:
      'Underappreciated janitor at the Vindicators headquarters with surprising insight.',
    image: avatar(252),
  },
  {
    name: 'Abradolf Lincler',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.MALE,
    description:
      'Failed genetic experiment blending historical leaders into one unstable being.',
    image: avatar(7),
  },
  {
    name: 'Giant Head',
    status: CharacterStatus.UNKNOWN,
    gender: CharacterGender.UNKNOWN,
    description:
      'Council leader broadcasting judgments from a massive floating head in space.',
    image: avatar(400),
  },
  {
    name: 'Fart',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.UNKNOWN,
    description:
      'Gaseous lifeform who speaks in musical tones about freedom and destruction.',
    image: avatar(122),
  },
];

async function main() {
  await prisma.character.deleteMany();
  await prisma.character.createMany({ data: characters });
  console.log(`Seeded ${characters.length} characters.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { parseAsString, parseAsStringEnum } from 'nuqs';

export const searchParser = parseAsString.withDefault('');
export const statusParser = parseAsStringEnum([
  'ALIVE',
  'DEAD',
  'UNKNOWN',
] as const);
export const genderParser = parseAsStringEnum([
  'MALE',
  'FEMALE',
  'UNKNOWN',
] as const);

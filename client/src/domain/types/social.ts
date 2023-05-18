export const AllSocialStandings = [
  'Equal',
  'Tolerated',
  'Feared',
  'Hated',
] as const
export type SocialStanding = (typeof AllSocialStandings)[number]
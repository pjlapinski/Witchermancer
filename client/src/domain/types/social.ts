export const AllSocialStandings = [
  'Equal',
  'Tolerated',
  'Feared',
  'Hated',
  'FearedAndHated'
] as const
export type SocialStanding = (typeof AllSocialStandings)[number]

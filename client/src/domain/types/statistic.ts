export const AllStatistics = [
  'Intelligence',
  'Reflex',
  'Dexterity',
  'Body',
  'Speed',
  'Empathy',
  'Craft',
  'Will',
  'Luck',
] as const

export type Statistic = (typeof AllStatistics)[number]

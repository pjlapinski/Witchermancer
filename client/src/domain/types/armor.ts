export const AllArmorSections = ['head', 'torso', 'legs', 'shield'] as const

export type ArmorSection = (typeof AllArmorSections)[number]

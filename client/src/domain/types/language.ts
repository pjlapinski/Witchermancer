export const AllLanguages = ['CommonSpeech', 'ElderSpeech', 'Dwarven'] as const

export type Language = (typeof AllLanguages)[number]

import { DieRoll } from '@/domain/types/common'
import { ComposerTranslation } from 'vue-i18n'

export const firstLetterLowerCase = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1)

export const formatDieRoll = (roll: DieRoll, t: ComposerTranslation) =>
  `${roll.diceAmount}${t('character.generic.dieRollSymbol')}${roll.diceType}${
    roll.modifier >= 0 ? '+' : ''
  }${roll.modifier}`

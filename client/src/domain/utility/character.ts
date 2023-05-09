import { Character } from '@/domain/types/character'
import { DieRoll } from '@/domain/types/common'

export const getPhysicalTableScore = (character: Character) =>
  Math.floor(
    (character.statistics.body.level +
      getModifier(character, 'body') +
      character.statistics.will.level +
      getModifier(character, 'will')) /
      2,
  )
export const getStunScore = (character: Character) =>
  getPhysicalTableScore(character) * 10
export const getHealthPoints = (character: Character) =>
  getPhysicalTableScore(character) * 5
export const getStaminaScore = getHealthPoints
export const getRecoveryScore = getPhysicalTableScore
export const getRunScore = (character: Character) =>
  (character.statistics.speed.level + getModifier(character, 'speed')) * 3
export const getLeapScore = (character: Character) => getRunScore(character) / 5
export const getEncumbranceScore = (character: Character) =>
  (character.statistics.body.level + getModifier(character, 'body')) * 10
export const getEncumbrancePenalty = (character: Character) => {
  const overLimit = getCarriedWeight(character) - getEncumbranceScore(character)
  return overLimit <= 0 ? 0 : Math.max(1, Math.floor(overLimit / 5))
}
export const getCarriedWeight = (character: Character) =>
  character.gear.reduce((val, gear, idx, arr) => val + gear.weight, 0)
export const getBonusMeleeDamage = (character: Character) =>
  Math.ceil(
    (character.statistics.body.level + getModifier(character, 'body')) / 2,
  ) *
    2 -
  6
export const getPunchDamage = (character: Character) =>
  ({
    diceAmount: 1,
    diceType: 6,
    modifier: getBonusMeleeDamage(character),
  } as DieRoll)
export const getKickDamage = (character: Character) =>
  ({
    diceAmount: 1,
    diceType: 6,
    modifier: getBonusMeleeDamage(character) + 4,
  } as DieRoll)
export const getVigor = (character: Character) => {
  const base = character.profession.vigor
  return base === 0 ? 0 : base + getModifier(character, 'vigor')
}
export const getModifier = (character: Character, modifier: string) =>
  character.modifiers[modifier] ?? 0

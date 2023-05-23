import {
  Character,
  Skill,
  StatisticWithSkills,
  Statistics,
} from '@/domain/types/character'
import { ArmorSection } from '@/domain/types/armor'
import { DieRoll } from '@/domain/types/common'

export const createDefaultCharacter = (): Character => {
  const defaultSkill = (): Skill => ({
    level: 0,
    difficult: false,
  })
  const difficultSkill = (): Skill => ({
    level: 0,
    difficult: true,
  })

  return {
    name: '',
    race: {
      name: '',
      perks: [{ name: '', description: '' }],
    },
    gender: '',
    age: 0,
    statistics: {
      intelligence: {
        level: 0,
        skills: {
          Awareness: defaultSkill(),
          Business: defaultSkill(),
          Deduction: defaultSkill(),
          Education: defaultSkill(),
          CommonSpeech: {
            difficult: true,
            level: 8,
          },
          ElderSpeech: difficultSkill(),
          Dwarven: difficultSkill(),
          MonsterLore: difficultSkill(),
          SocialEtiquette: defaultSkill(),
          Streetwise: defaultSkill(),
          Tactics: difficultSkill(),
          Teaching: defaultSkill(),
          WildernessSurvival: defaultSkill(),
        },
      },
      reflex: {
        level: 0,
        skills: {
          Brawling: defaultSkill(),
          DodgeEscape: defaultSkill(),
          Melee: defaultSkill(),
          Riding: defaultSkill(),
          Sailing: defaultSkill(),
          SmallBlades: defaultSkill(),
          StaffSpear: defaultSkill(),
          Swordsmanship: defaultSkill(),
        },
      },
      dexterity: {
        level: 0,
        skills: {
          Archery: defaultSkill(),
          Athletics: defaultSkill(),
          Crossbow: defaultSkill(),
          SleightOfHand: defaultSkill(),
          Stealth: defaultSkill(),
        },
      },
      body: {
        level: 0,
        skills: {
          Physique: defaultSkill(),
          Endurance: defaultSkill(),
        },
      },
      speed: { level: 0 },
      empathy: {
        level: 0,
        skills: {
          Charisma: defaultSkill(),
          Deceit: defaultSkill(),
          FineArts: defaultSkill(),
          Gambling: defaultSkill(),
          GroomingAndStyle: defaultSkill(),
          HumanPerception: defaultSkill(),
          Leadership: defaultSkill(),
          Persuasion: defaultSkill(),
          Performance: defaultSkill(),
          Seduction: defaultSkill(),
        },
      },
      craft: {
        level: 0,
        skills: {
          Alchemy: difficultSkill(),
          Crafting: difficultSkill(),
          Disguise: defaultSkill(),
          FirstAid: defaultSkill(),
          Forgery: defaultSkill(),
          PickLock: defaultSkill(),
          TrapCrafting: difficultSkill(),
        },
      },
      will: {
        level: 0,
        skills: {
          Courage: defaultSkill(),
          HexWeaving: difficultSkill(),
          Intimidation: defaultSkill(),
          SpellCasting: difficultSkill(),
          ResistMagic: difficultSkill(),
          ResistCoercion: defaultSkill(),
          RitualCrafting: difficultSkill(),
        },
      },
      luck: {
        level: 0,
        current: 0,
      },
    },
    profession: {
      name: '',
      abilities: [],
      definingSkill: {
        name: '',
        level: 0,
        description: '',
        statistic: 'Intelligence',
      },
      vigor: 0,
    },
    improvementPoints: 0,
    reputation: '',
    socialStanding: 'Equal',
    lifePath: '',
    gear: [],
    money: 0,
    weapons: [],
    armor: {},
    currentHealthPoints: 0,
    currentStamina: 0,
    currentStun: 0,
    spells: [],
    hexes: [],
    rituals: [],
    notes: '',
    modifiers: {},
  }
}

export const stunMod = 'stun'
export const healthMod = 'health'
export const staminaMod = 'stamina'
export const recoveryMod = 'recovery'
export const woundThresholdMod = 'woundThreshold'
export const runMod = 'run'
export const leapMod = 'leap'
export const encumbranceMod = 'encumbrance'
export const damageMod = 'damage'
export const armorMod = 'armor'
export const vigorMod = 'vigor'

export const getPhysicalTableScore = (character: Character) =>
  Math.floor(
    (character.statistics.body.level +
      getModifier(character, 'body') +
      character.statistics.will.level +
      getModifier(character, 'will')) /
      2,
  )
export const getStunScore = (character: Character) =>
  getPhysicalTableScore(character) * 10 + getModifier(character, stunMod)
export const getHealthPoints = (character: Character) =>
  getPhysicalTableScore(character) * 5 + getModifier(character, healthMod)
export const getStaminaScore = (character: Character) =>
  getPhysicalTableScore(character) * 5 + getModifier(character, staminaMod)
export const getRecoveryScore = (character: Character) =>
  getPhysicalTableScore(character) + getModifier(character, recoveryMod)
export const getWoundThreshold = (character: Character) =>
  getPhysicalTableScore(character) + getModifier(character, woundThresholdMod)
export const getRunScore = (character: Character) =>
  getStatistic(character, 'speed') * 3 + getModifier(character, runMod)
export const getLeapScore = (character: Character) =>
  getRunScore(character) / 5 + getModifier(character, leapMod)
export const getEncumbranceScore = (character: Character) =>
  getStatistic(character, 'body') * 10 + getModifier(character, encumbranceMod)
export const getEncumbrancePenalty = (character: Character) => {
  const overLimit = getCarriedWeight(character) - getEncumbranceScore(character)
  return overLimit <= 0 ? 0 : Math.max(1, Math.floor(overLimit / 5))
}
export const getCarriedWeight = (character: Character) =>
  character.gear.reduce((val, gear) => val + gear.weight * gear.amount, 0) +
  character.weapons.reduce((val, wpn) => val + wpn.weight, 0) +
  (character.armor.head?.weight ?? 0) +
  (character.armor.legs?.weight ?? 0) +
  (character.armor.torso?.weight ?? 0) +
  (character.armor.shield?.weight ?? 0)
export const getBonusMeleeDamage = (character: Character) =>
  Math.ceil(getStatistic(character, 'body') / 2) * 2 -
  6 +
  getModifier(character, damageMod)
export const getPunchDamage = (character: Character): DieRoll => ({
  diceAmount: 1,
  diceType: 6,
  modifier: getBonusMeleeDamage(character),
})
export const getKickDamage = (character: Character): DieRoll => ({
  diceAmount: 1,
  diceType: 6,
  modifier: getBonusMeleeDamage(character) + 4,
})
export const getWeaponDamage = (character: Character, idx: number): DieRoll => {
  const weapon = character.weapons[idx]
  return {
    diceAmount: weapon.damage.diceAmount,
    diceType: weapon.damage.diceType,
    modifier: weapon.damage.modifier + getBonusMeleeDamage(character),
  }
}
export const getStoppingPower = (character: Character, section: ArmorSection) =>
  (character.armor[section]?.stoppingPower ?? 0) +
  getModifier(character, armorMod)
export const getVigor = (character: Character) => {
  const base = character.profession.vigor
  return base === 0 ? 0 : base + getModifier(character, vigorMod)
}
export const getModifier = (character: Character, modifier: string) =>
  character.modifiers[modifier] ?? 0
export const getStatistic = (character: Character, statistic: string) => {
  let penalty = 0
  if (statistic === 'dexterity' || statistic === 'reflex')
    penalty =
      (character.armor.head?.encumbranceValue ?? 0) +
      (character.armor.legs?.encumbranceValue ?? 0) +
      (character.armor.torso?.encumbranceValue ?? 0) +
      (character.armor.shield?.encumbranceValue ?? 0)
  if (
    statistic === 'dexterity' ||
    statistic === 'reflex' ||
    statistic === 'speed'
  )
    penalty += getEncumbrancePenalty(character)
  return (
    character.statistics[statistic as keyof Statistics].level +
    getModifier(character, statistic) -
    penalty
  )
}
export const getSkill = (
  character: Character,
  statistic: string,
  skill: string,
) =>
  (character.statistics[statistic as keyof Statistics] as StatisticWithSkills)
    .skills[skill].level + getModifier(character, skill)

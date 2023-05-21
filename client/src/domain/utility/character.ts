import {
  Character,
  Skill,
  StatisticWithSkills,
  Statistics,
} from '@/domain/types/character'
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
    primaryWeaponIdx: -1,
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

export const getPhysicalTableScore = (character: Character) =>
  Math.floor(
    (character.statistics.body.level +
      getModifier(character, 'body') +
      character.statistics.will.level +
      getModifier(character, 'will')) /
      2,
  )
export const getStunScore = (character: Character) =>
  getPhysicalTableScore(character) * 10 + getModifier(character, 'stun')
export const getHealthPoints = (character: Character) =>
  getPhysicalTableScore(character) * 5 + getModifier(character, 'health')
export const getStaminaScore = (character: Character) =>
  getPhysicalTableScore(character) * 5 + getModifier(character, 'stamina')
export const getRecoveryScore = (character: Character) =>
  getPhysicalTableScore(character) + getModifier(character, 'recovery')
export const getWoundThreshold = (character: Character) =>
  getPhysicalTableScore(character) + getModifier(character, 'woundThreshold')
export const getRunScore = (character: Character) =>
  (character.statistics.speed.level + getModifier(character, 'speed')) * 3 +
  getModifier(character, 'run')
export const getLeapScore = (character: Character) =>
  getRunScore(character) / 5 + getModifier(character, 'leap')
export const getEncumbranceScore = (character: Character) =>
  (character.statistics.body.level + getModifier(character, 'body')) * 10 +
  getModifier(character, 'encumbrance')
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
export const getVigor = (character: Character) => {
  const base = character.profession.vigor
  return base === 0 ? 0 : base + getModifier(character, 'vigor')
}
export const getModifier = (character: Character, modifier: string) =>
  character.modifiers[modifier] ?? 0
export const getStatistic = (character: Character, statistic: string) =>
  character.statistics[statistic as keyof Statistics].level +
  getModifier(character, statistic)
export const getSkill = (
  character: Character,
  statistic: string,
  skill: string,
) =>
  (character.statistics[statistic as keyof Statistics] as StatisticWithSkills)
    .skills[skill].level + getModifier(character, skill)

import { Character, Skill } from '@/domain/types/character'
import { DieRoll } from '@/domain/types/common'

export const createDefaultCharacter = (): Character => {
  const defaultSkill = (): Skill => ({
    level: -1,
    difficult: false,
  })
  const difficultSkill = (): Skill => ({
    level: -1,
    difficult: true,
  })

  return {
    name: '',
    race: {
      name: '',
      perks: [{ name: '', description: '' }],
    },
    gender: '',
    age: -1,
    statistics: {
      intelligence: {
        level: -1,
        skills: {
          Awareness: defaultSkill(),
          Business: defaultSkill(),
          Deduction: defaultSkill(),
          Education: defaultSkill(),
          CommonSpeech: difficultSkill(),
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
        level: -1,
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
        level: -1,
        skills: {
          Archery: defaultSkill(),
          Athletics: defaultSkill(),
          Crossbow: defaultSkill(),
          SleightOfHand: defaultSkill(),
          Stealth: defaultSkill(),
        },
      },
      body: {
        level: -1,
        skills: {
          Physique: defaultSkill(),
          Endurance: defaultSkill(),
        },
      },
      speed: { level: -1 },
      empathy: {
        level: -1,
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
        level: -1,
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
        level: -1,
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
        level: -1,
        current: -1,
      },
    },
    profession: {
      name: '',
      abilities: [],
      skill: {
        name: '',
        level: -1,
        description: '',
      },
      vigor: -1,
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
    currentVigor: 0,
    spells: [],
    hexes: [],
    rituals: [],
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

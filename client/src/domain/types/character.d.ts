import { Armor, Gear, Weapon } from '@/domain/types/gear'
import { Hex, Ritual, Spell } from '@/domain/types/magic'
import { SocialStanding } from '@/domain/types/social'
import { Statistic } from '@/domain/types/statistic'

export type Perk = {
  name: string
  description: string
}

export type Race = {
  name: string
  perks: Perk[]
}

export type Skill = {
  level: number
  difficult: boolean
}

export type ProfessionAbility = {
  name: string
  level: number
  description: string
  statistic: Statistic
}

export type Profession = {
  name: string
  vigor: number
  definingSkill: ProfessionAbility
  abilities: ProfessionAbility[]
}

export type StatisticWithSkills = {
  level: number
  skills: {
    [key: string]: Skill
  }
}

export type Statistics = {
  intelligence: {
    level: number
    skills: {
      Awareness: Skill
      Business: Skill
      Deduction: Skill
      Education: Skill
      CommonSpeech: Skill
      ElderSpeech: Skill
      Dwarven: Skill
      MonsterLore: Skill
      SocialEtiquette: Skill
      Streetwise: Skill
      Tactics: Skill
      Teaching: Skill
      WildernessSurvival: Skill
    }
  }
  reflex: {
    level: number
    skills: {
      Brawling: Skill
      DodgeEscape: Skill
      Melee: Skill
      Riding: Skill
      Sailing: Skill
      SmallBlades: Skill
      StaffSpear: Skill
      Swordsmanship: Skill
    }
  }
  dexterity: {
    level: number
    skills: {
      Archery: Skill
      Athletics: Skill
      Crossbow: Skill
      SleightOfHand: Skill
      Stealth: Skill
    }
  }
  body: {
    level: number
    skills: {
      Physique: Skill
      Endurance: Skill
    }
  }
  speed: {
    level: number
  }
  empathy: {
    level: number
    skills: {
      Charisma: Skill
      Deceit: Skill
      FineArts: Skill
      Gambling: Skill
      GroomingAndStyle: Skill
      HumanPerception: Skill
      Leadership: Skill
      Persuasion: Skill
      Performance: Skill
      Seduction: Skill
    }
  }
  craft: {
    level: number
    skills: {
      Alchemy: Skill
      Crafting: Skill
      Disguise: Skill
      FirstAid: Skill
      Forgery: Skill
      PickLock: Skill
      TrapCrafting: Skill
    }
  }
  will: {
    level: number
    skills: {
      Courage: Skill
      HexWeaving: Skill
      Intimidation: Skill
      SpellCasting: Skill
      ResistMagic: Skill
      ResistCoercion: Skill
      RitualCrafting: Skill
    }
  }
  luck: {
    level: number
    current: number
  }
}

export type CraftingRecipe = {
  name: string
  difficultyClass: number
  time: string
}

export type Modifiers = {
  [key: string]: number
}

export type Character = {
  idString?: ''
  ownerEmail?: string
  name: string
  race: Race
  gender: string
  age: number
  statistics: Statistics
  profession: Profession
  improvementPoints: number
  reputation: string
  socialStanding: SocialStanding
  lifePath: string
  gear: Gear[]
  money: number
  weapons: Weapon[]
  primaryWeaponIdx: number
  armor: {
    head?: Armor
    torso?: Armor
    legs?: Armor
    shield?: Armor
  }
  currentHealthPoints: number
  currentStamina: number
  currentStun: number
  spells: Spell[]
  hexes: Hex[]
  rituals: Ritual[]
  notes: string
  modifiers: Modifiers
}

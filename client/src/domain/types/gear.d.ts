import { DieRoll } from '@/domain/types/common'

export type Gear = {
  name: string
  notes: string
  weight: number
}

export type DamageType = 'Slashing' | 'Piercing' | 'Bludgeoning' | 'Elemental'

export type Weapon = {
  name: string
  type: DamageType[]
  accuracy: number
  damage: DieRoll
  reliability: number
  handsRequired: 1 | 2
  range: string
  effect: string
  concealment: 'Tiny' | 'Small' | 'Large' | "Can't Hide"
  enhancements: {
    available: number
    inserted: string[]
  }
  weight: number
}

export type Armor = {
  name: string
  stoppingPower: number
  enhancements: {
    available: number
    inserted: string[]
  }
  effect: string
  encumbranceValue: number
  weight: number
}

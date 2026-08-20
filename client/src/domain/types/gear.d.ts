import { DieRoll } from '@/domain/types/money'
import { Currencies, DisplayCurrencies } from "@/domain/types/money";

export type Gear = {
    name: string
    notes: string
    weight: number
    amount: number
}

export type Concealment = 'Tiny' | 'Small' | 'Large' | 'CantHide'

export type Weapon = {
    name: string
    type: string
    accuracy: number
    damage: DieRoll
    reliability: number
    range: string
    effect: string
    concealment: Concealment
    enhancements: {
        available: number
        inserted: string
    }
    notes: string
    weight: number
}

export type Armor = {
    name: string
    stoppingPower: number
    enhancements: {
        available: number
        inserted: string
    }
    effect: string
    encumbranceValue: number
    notes: string
    weight: number
}

export type Currency = (typeof Currencies)[number]
export type DisplayCurrency = (typeof DisplayCurrencies)[number]

export type Money = {
    amount: number
    currency: Currency
}

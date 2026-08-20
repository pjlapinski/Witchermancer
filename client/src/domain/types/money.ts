import type { Money, Currency } from "@/domain/types/gear"
import { round } from "@/domain/utility/math";

export const Currencies = [
    'novigrad',
    'temeria',
    'nilfgaard',
    'kaedwen',
    'aedirn',
    'cidaris',
    'poviss',
    'kovir',
    'hengfors',
    'skellige',
    'rivia'
] as const

export const BaseCurrency: Currency = 'novigrad'

export const DisplayCurrencies = [
    'default',
    ...Currencies
] as const

export const getApproxCrownsValue = (money: Money[]) => 
    round(money.reduce((sum, curr) => (sum + convertCurrency(curr, BaseCurrency)), 0))

export const convertCurrency = (money: Money, currency: Currency) => {
    if (money.currency === currency) return money.amount
    console.log('TODO: Convert currency')
    return money.amount
}

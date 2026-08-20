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

const conversionTable: {[K in Currency]: number} = {
    novigrad: 1,
    temeria: 1,
    nilfgaard: 1/3,
    kaedwen: 3,
    aedirn: 6,
    cidaris: 2,
    poviss: 1/4,
    kovir: 1/8,
    hengfors: 1/2,
    skellige: 8,
    rivia: 6
}

export const convertCurrency = (money: Money, currency: Currency) => {
    if (money.currency === currency) return money.amount
    const crowns = money.amount * (1 / conversionTable[money.currency])
    return crowns * conversionTable[currency]
}

/* 
Known conversions:
1 novigrad crown = 1 temerian oren
1 nilfgaardian floren = 3 novigrad crowns
1 novigrad crown = 3 kaedweni ducats
1 poviss bizant = 4 novigrad crowns
1 hengeforsian lintar = 2 novigrad crowns
1 kovirian mark = 2 poviss bizant
1 kaedweni ducat = 2 aedirnian mark

Made up conversions:
1 novigrad crown = 2 cidarian thaler
1 lyrian and rivian gulden = 1 aedirnian mark
1 cidarian thaler = 4 cintrian ducat

All converted to crowns:
1 temerian oren
1/3 nilfgaardian floren
3 kaedweni ducats
1/4 poviss bizant
1/2 hengeforsian lintar
1/8 kovirian mark
6 aedirnian marks
2 cidarian thalers
8 cintrian ducats
6 lyrian and rivian guldens
 */

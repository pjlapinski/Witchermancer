// @ts-ignore
import XMLHttpRequest from 'xhr2'
import Papa from 'papaparse'
import config from '@/config'

globalThis.XMLHttpRequest = XMLHttpRequest

export type Localization = {
  [key: string]: {
    [key: string]: string
  }
}

type LocaleObj = { [key: string]: any }
const deepSelect = (key: string[], obj: LocaleObj): LocaleObj => {
  if (key.length === 0) {
    // technically should not be possible
    return {}
  }
  if (key.length === 1) {
    return obj
  }
  if (!(key[0] in obj)) {
    obj[key[0]] = {}
  }
  return deepSelect(key.slice(1), obj[key[0]])
}

export const fetchLocalization = (): Promise<Localization> =>
  new Promise((resolve, reject) => {
    Papa.parse(config.LOCALIZATION_URL, {
      download: true,
      complete(result) {
        if (result.errors.length > 0) {
          console.log(result.data)
          console.error(result.errors)
          reject(result.errors)
          return
        }
        const data = result.data as string[][]
        const headers = data[0]
        const locales = headers.slice(1)

        const json: Localization = locales.reduce(
          (acc, curr) => ({ ...acc, [curr]: {} }),
          {},
        )

        data.slice(1).forEach(row => {
          const key = row[0]
          const keyParts = key.split('.')
          const finalKey = keyParts[keyParts.length - 1]
          row.slice(1).forEach((entry, i) => {
            deepSelect(keyParts, json[locales[i]])[finalKey] = entry
          })
        })
        resolve(json)
      },
    })
  })

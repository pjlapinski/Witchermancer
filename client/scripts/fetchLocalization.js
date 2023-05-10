require('dotenv').config()
globalThis.XMLHttpRequest = require('xhr2')
const Papa = require('papaparse')
const fs = require('fs')

const localePath = 'src/assets/locales.json'

Papa.parse(process.env.LOCALIZATION_URL, {
  download: true,
  complete(result) {
    if (result.errors.length > 0) {
      console.error(result.errors)
      process.exit(1)
    }
    const headers = result.data[0]
    const locales = headers.slice(1)

    const json = locales.reduce((acc, curr) => ({ ...acc, [curr]: {} }), {})

    result.data.slice(1).forEach(row => {
      const key = row[0]
      row.slice(1).forEach((entry, i) => {
        json[locales[i]][key] = entry
      })
    })

    fs.writeFile(localePath, JSON.stringify(json), err => {
      if (err) console.error(err)
    })
  },
})

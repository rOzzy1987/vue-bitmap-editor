/**
 * ILabels interface definition generator
 *
 * Usage: node generateLabelsDefinition <source.json>
 * Source JSON format:
 * {
 *   lang_1: {
 *     label_1: "lang_1 translation"
 *   },
 *   lang_2: {
 *     label_1: "lang_2 translation"
 *   }
 * }
 */
'use strict'
// eslint-disable-file @typescript-eslint/no-require-imports
var fs = require('fs')
var path = require('path')
const argv = process.argv.slice(2)

var file = argv[0]
var dir = path.dirname(file)

console.log(`Generating ILabels interface definition from '${file}'`)
var obj = require(file)
var langs = []
var labels = []
var errors = []
for (var lang in obj) {
    langs.push(lang)
    for (var label in obj[lang]) {
        if (!/^[a-z_][a-z0-9_]*$/gi.test(label)) {
            errors.push(`[${lang}/${label}]: Invalid label name!`)
        } else if (labels.indexOf(label) == -1) {
            labels.push(label)
        }
    }
}

langs = langs.map((l) => `'${l}'`)
labels = labels.map((l) => `    ${l}: string`)

if (errors.length == 0) {
    var result = `export type SupportedLanguage = ${langs.join(' | ')}

export interface ILabels {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f(label: string, ...args: any[]): string
${labels.join('\n')}
}
`
    var outfile = path.join(dir, 'i18n.generated.ts')
    fs.writeFileSync(outfile, result)
    console.log(`Generated file: '${outfile}'`)
    console.log(`------------------------------`)
}

console.log(`Languages included: ${langs.length}`)
console.log(`Label count: ${labels.length}`)
console.log(`------------------------------`)
if (errors.length) {
    console.log(`Error count: ${errors.length}`)
    for (var e of errors) console.log(' ' + e)
} else {
    console.log(`${result.length} bytes written`)
}

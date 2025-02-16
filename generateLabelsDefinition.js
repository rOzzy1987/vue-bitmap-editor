'use strict';

const fs = require('fs');
const path = require('path')
const argv = process.argv.slice(2);

var file = argv[0]
var dir = path.dirname(file)

console.log(`Generating ILabels interface definition from '${file}'`)
var obj = require(file);
var langs = [];
var labels = [];
for(var lang in obj){
    langs.push(lang);
    for (var label in obj[lang]) {
        if (labels.indexOf(label) == -1){
            labels.push(label);
        }
    }
}

langs = langs.map(l => `'${l}'`)
labels = labels.map(l => `  '${l}': string`)

var result =
`export type SupportedLanguage = ${langs.join(' | ')}

export interface ILabels {
  f(label:string, ...args: any[]): string
${labels.join('\n')}
}`

var outfile = path.join(dir, 'i18n.generated.ts')
fs.writeFileSync(outfile, result);
console.log(`Generated file: '${outfile}'`)
console.log(`------------------------------`)
console.log(`Languages included: ${langs.length}`)
console.log(`Label count: ${labels.length}`)
console.log(`------------------------------`)
console.log(`${result.length} bytes written`)
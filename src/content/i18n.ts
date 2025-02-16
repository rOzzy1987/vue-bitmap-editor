/**
 * Translation engine for internationalization
 * - i18n.generated.ts should be generated using the generateLabelsDefinition.js node module
 * - labels.json contains the text content
 */

import __src from './labels.json'
import { type ILabels, type SupportedLanguage } from './i18n.generated'

/**
 * Base class to define indexer behavior on source objects
 */
class LabelSourceBase {
    [lang: string]: Partial<ILabels>
}

export class Translator {
    public static defaultLanguage: SupportedLanguage = 'en'

    /**
     * Loads translated labels from a tranlsation repository object.
     * Gets the union of labels from translations prioritizing culture-specific ones.
     *
     * @param src Loaded label repository object (from labels.json)
     * @returns translated labels
     */
    public static getLabels(src: object): ILabels {
        const lsrc = Object.assign(src, new LabelSourceBase())

        let clientLanguage = navigator.language.toLowerCase()
        let result = this.mergeObjects(
            new LabelsBase(),
            this.tryGetTranslations(clientLanguage, lsrc),
        )

        if (/[a-z]{2}-[a-z]{2}/gi.test(clientLanguage)) {
            clientLanguage = clientLanguage.split('-')[0]
            const languageSpecific = this.tryGetTranslations(clientLanguage, lsrc)
            result = this.mergeObjects(result, languageSpecific)
        }

        if (clientLanguage != this.defaultLanguage) {
            const defaultTranslations = this.tryGetTranslations(this.defaultLanguage, lsrc)
            result = this.mergeObjects(result, defaultTranslations)
        }

        return result as ILabels
    }

    private static tryGetTranslations(lang: string, lsrc: LabelSourceBase): Partial<ILabels> {
        if (lsrc.hasOwnProperty(lang)) return lsrc[lang] as ILabels
        return {}
    }

    private static mergeObjects(
        translations: Partial<ILabels>,
        mergeFrom: Partial<ILabels>,
    ): Partial<ILabels> {
        return Object.assign(mergeFrom, translations)
    }
}

class LabelsBase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public f(format: string, ...args: any[]): string {
        if (args.length == 0) console.warn('Useless format call! No arguments given')

        let r = format
        for (let i = 1; i < args.length; i++) {
            r = r.replace(`{${i}}`, args[i])
        }
        return r
    }
}

/**
 * Default translations for current UI culture
 */
const T = Translator.getLabels(__src)
export default T

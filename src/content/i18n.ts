import __src from './labels.json'
import {type ILabels, type SupportedLanguage} from './i18n.generated'

class LabelSourceBase {[lang:string]:Partial<ILabels>}
const __labelSource = Object.assign(__src, new LabelSourceBase)

export class Translator {
    public static defaultLanguage: SupportedLanguage ="en";

    public static getLabels(): ILabels {
        var clientLanguage = navigator.language.toLowerCase()
        var result = this.mergeObjects(new LabelsBase(), this.tryGetTranslations(clientLanguage));

        if (/[a-z]{2}-[a-z]{2}/gi.test(clientLanguage))  {
            clientLanguage = clientLanguage.split('-')[0]
            var languageSpecific = this.tryGetTranslations(clientLanguage)
            result = this.mergeObjects(result, languageSpecific);
        }

        if (clientLanguage != this.defaultLanguage) {
            var defaultTranslations = this.tryGetTranslations(this.defaultLanguage);
            result = this.mergeObjects(result, defaultTranslations)
        }

        return result as ILabels;
    }

    private static tryGetTranslations(lang: string): Partial<ILabels>{
        if (__labelSource.hasOwnProperty(lang))
            return __labelSource[lang] as ILabels;
        return {};
    }
    private static mergeObjects(translations: Partial<ILabels>, mergeFrom: Partial<ILabels>): Partial<ILabels>{
        return Object.assign(mergeFrom, translations);
    }
}

class LabelsBase {
    public f():string {
        if(arguments.length == 0)
            throw "Nothing to format!"
        if(arguments.length == 1)
            console.warn("Useless format call! No arguments given");

        let r = arguments[0] as string;
        for(let i = 1; i < arguments.length; i++){
            r = r.replace(`{${i}}`, arguments[i]);
        }
        return r;
    }
}

const T = Translator.getLabels();
export default T
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {store} from './shared/Redux/store'
import EN from "./translation/locales/translationEN.json";
import SP from "./translation/locales/translationSP.json";


// the translation
console.log("test",store.getState())
const {lang:{lang}} = store.getState().root
const resources = {
    en:{
        translation: EN
    },
    sp:{
        translation: SP
    }
};

i18n
.use(initReactI18next) // passes i18n down to react-i18next
.init({
    resources,
    lng: lang ? lang: 'en',
    keySeparator: false, //we do not use keys in form messages.welcome

    interpolation: {
        escapeValue: false //react already safe from xss
    }
});

export default i18n;
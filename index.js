/**
 * Vuex-i18n-Remote is used to fetch translations from the server and update
 * the Vuex-i18n store module for use in the application.
 *
 * This requires vuex-i18n and vue-axios to be installed in order to run.
 */
import Axios from "axios";
import VueAxios from "vue-axios";
import Vuex from 'vuex';
import VuexI18n from "vuex-i18n";

let VuexI18nRemote = {};

VuexI18nRemote.install = (Vue, options) => {
    // define options
    options = Object.assign({
        url: 'translations',
        store: new Vuex.Store({}),
        storeModuleName: 'i18n',
        axios: Axios,
        commonKeys: [],
        onTranslationNotFound: function (locale, key) {}
    }, options);

    // check dependencies
    if (! Vue.axios) {
        Vue.use(VueAxios, options.axios);
    }

    if (! Vue.i18n) {
        Vue.use(VuexI18n.plugin, options.store, {
            moduleName: options.storeModuleName,
            onTranslationNotFound: options.onTranslationNotFound,
        });
    }

    // method to fetch translations from server.
    let loadTranslations = (key, locale) => {
        return new Promise((resolve, reject) => {
            let keys = [];

            if (! key) {
                keys = options.commonKeys;
            } else {
                keys.push(key);
            }

            if (! locale) {
                locale = Vue.i18n.locale();
            }

            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];

                Vue.axios
                    .get(options.url, {
                        params: {
                            key: key,
                            locale: locale,
                        },
                    })
                    .then((response) => {
                        let translations = {};

                        translations[key] = response.data;

                        Vue.i18n.add(locale, translations);

                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        });
    };

    // register global methods
    Vue.i18nRemote = {
        load: loadTranslations,
    };

    // register vue prototype methods
    Vue.prototype.$i18nRemote = {
        load: loadTranslations,
    };
};

export default VuexI18nRemote;

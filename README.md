# vuex-i18n-remote

This is a small package that can be used to load translations from a remote server. 

This is best used with grouped short key based translations (ei. `home.welcome` -> 'This is a welcome message.'), 
so that you can load groups of translations at a time.

## Requirements

* [vuex-i18n](https://www.npmjs.com/package/vuex-i18n) ^1.13.0
* [vue-axios](https://www.npmjs.com/package/vue-axios) ^2.1.0
    
## Usage

```js
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import VuexI18nRemote from "vuex-i18n-remote"; // file from vuex-i18n-remote plugin

// ...setup Axios default config

// use Vuex
Vue.use(Vuex);

// setup store
const store = new Vuex.Store({
    // ...config options
});

// setup vuex-i18n-remote
Vue.use(VuexI18nRemote, {
    url: 'translations', // translations uri
    axios: Axios, // axios object
    store: store, // store instance
    storeModuleName: 'i18n', // store module name
    commonKeys: [ // common keys
        'common',
    ],
});

const app = new Vue({
    el: '#app',
    store,
});
```

Once the library is installed, [vuex-i18n](https://www.npmjs.com/package/vuex-i18n) will also be installed.

## Options 

| Key                   | Description                                                                                               | Default                     |
| --------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------- |
| url                   | This is the URL where the translations will be fetched from.                                              | translations                |
| store                 | This is the Vuex store to be used to store the translations.                                              | `new Vuex.Store({})`        | 
| storeModuleName       | This is the store module name used to store the translations                                              | i18n                        |
| axios                 | The Axios instance used for the http requests                                                             | `Axios`                     |
| commonKeys            | This is an array of common keys that should be loaded by default if no option is specified by the method. | `[]`                        |
| onTranslationNotFound | Callback used if translation is not found                                                                 | `function (locale, key) {}` |

## Methods

Once loaded the plugin will add the following methods to Vue.

#### Global

##### Options

| Key       | Description                       | Default                           |
| --------- | --------------------------------- | --------------------------------- |
| key       | The key to get from the server    | `commonKeys` set above            |
| locale    | The locale to be used             | locale from `Vue.i18n.locale()`   |

##### Usage

```js
Vue.i18nRemote.load(key, locale);
```

#### Instance

##### Options

| Key       | Description                       | Default                           |
| --------- | --------------------------------- | --------------------------------- |
| key       | The key to get from the server    | `commonKeys` set above            |
| locale    | The locale to be used             | locale from `Vue.i18n.locale()`   |

##### Usage

```js
this.$i18nRemote.load(key, locale);
```

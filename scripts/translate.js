/* global MutationObserver */

import * as fs from 'fs'
import { sync as globSync } from 'glob'
import { sync as mkdirpSync } from 'mkdirp'
// import { localize } from 'pseudo-localization' NEED TO FIX THIS...
import Translator from './lib/pseudo'

const MESSAGES_PATTERN = './src/client/translations/src/**/*.json'
const LANG_DIR = './src/client/translations/'

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(MESSAGES_PATTERN)
    .map(filename => fs.readFileSync(filename, 'utf8'))
    .map(file => JSON.parse(file))
    .reduce((collection, descriptors) => {
      descriptors.forEach(({ id, defaultMessage }) => {
        if (Object.prototype.hasOwnProperty.call(collection, id)) {
          throw new Error(`Duplicate message id: ${id}`)
        }

        collection[id] = defaultMessage
      })

      return collection
    }, {})

const pseudoTranslator = new Translator(text => (text))
const pseudoMessages = Object.keys(defaultMessages)
    .map(id => [id, defaultMessages[id]])
    .reduce((collection, [id, defaultMessage]) => {
      collection[id] = pseudoTranslator.translate(defaultMessage)
      return collection
    }, {})

mkdirpSync(LANG_DIR)
fs.writeFileSync(`${LANG_DIR}en-US.json`, JSON.stringify(defaultMessages, null, 2))
fs.writeFileSync(`${LANG_DIR}pseudo.json`, JSON.stringify(pseudoMessages, null, 2))

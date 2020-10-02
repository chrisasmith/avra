import express from 'express'
import { sync as globSync } from 'glob';
import nocache from 'nocache'
import path from 'path'
import { readFileSync } from 'fs'
import serialize from 'serialize-javascript';
import routes from '../../dist/routes'

// load the asset lookup on startup
const assets = JSON.parse(readFileSync('./dist/public/webpack-assets.json'))

const app = express()
const server = app.listen(process.env.PORT || 3030)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/templates'))

const translations = globSync('./src/client/translations/*.json')
  .map((filename) => [
    path.basename(filename, '.json'),
    readFileSync(filename, 'utf8'),
  ])
  .map(([locale, file]) => [locale, JSON.parse(file)])
  .reduce((collection, [locale, messages]) => {
    collection[locale] = messages;
    return collection;
  }, {});

const locale = 'en-US';
const messages = translations[locale];

const fileRender = (res, data) => res.render('template.ejs', { ...assets, ...data, locale: serialize({ locale, messages }) })

app.use(express.static('build'));
app.use(express.static('../../node_modules'));

const render = (req, res, code) => {
  const ress = code === 404 ? res.status(404) : res
  fileRender(ress)
}

routes.forEach((route) => {
  app.get(route, nocache(), render)
})

app.use('/', express.static('dist/public'))
app.get('*', nocache(), (req, res) => render(req, res, 404))

module.exports = server

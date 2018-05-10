import * as api from '../api'
import * as auth from '../auth'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as next from 'next'
import * as passport from 'passport'
import * as session from 'express-session'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
      .use(cookieParser()) // TODO: Need to use same secret as session?
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      // TODO: use CORS
      // TODO: re-evaluate this configuration.
      .use(session({
        secret: 'anything',
        resave: true,
        saveUninitialized: true,
      }))
      .use(passport.initialize())
      .use(passport.session())

    server.use('/auth', auth)
    server.use('/api', api)

    server.get('/authenticated', (req, res) => {
      res.send({
        authenticated: !!req.user
      })
    })

    server.get('*', (req, res) => {
      res.locals.authenticated = !!req.user
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
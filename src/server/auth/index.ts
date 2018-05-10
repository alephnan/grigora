import * as express from 'express'
import * as passport from 'passport'
import secrets from './google_secrets';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { tokenStore } from './google_token_store'

const {
  web: {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uris
  }
} = secrets;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: redirect_uris[0]
},
  (accessToken, refreshToken, profile, cb) => {
    const googleId = profile.id;

    const prevRefreshToken = tokenStore.getRefreshToken(googleId)
    // Get new refresh token.
    if (!refreshToken && !prevRefreshToken) {
      return cb(null, false);
    }
    refreshToken = refreshToken || prevRefreshToken
    tokenStore.setRefreshToken(googleId, refreshToken);
    tokenStore.setAccessToken(refreshToken, {
      accessToken,
      expiration: 'foo',
    })
    const user = { id: googleId }
    return cb(null, user)
  }))
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

const scopes = [
  'profile',
  'https://www.googleapis.com/auth/appengine.admin',
  'https://www.googleapis.com/auth/cloud-platform',
]

const router = express.Router()
router.get('/google',
  passport.authenticate('google', { scope: scopes, accessType: 'offline' }),
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return
    }
    next()
  });
// Consent for a new refresh token.
router.get('/consent',
  passport.authenticate('google', { scope: scopes, accessType: 'offline', prompt: 'consent' }),
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return
    }
    next()
  });

// Handler for google auth callback route depends on dev-environment.
const googleCallbackRouteHandler = (isDev => {
  const redirectPath = isDev ? `http://localhost:3000'/dashboard'` : '/dashboard';
  return (req, res) => {
    // const redirect = req.session.oauth2return || '/';
    delete req.session.oauth2return
    // Successful authentication, redirect home.
    res.redirect(redirectPath)
  };
})(process.env.NODE_ENV === 'development');
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/consent' }),
  googleCallbackRouteHandler)


module.exports = router;

const axios = require('axios')
const express = require('express')
const tokenStore = require('./auth/google_token_store')

const router = express.Router();

router.use('/', (req, res, next) => {
  if (!req.user || !req.user.id) {
    console.log('Not authenticated')
    res.status(401).end()
    return
    // TODO: Handle on client. Redirect or link to login.
  }
  const refreshToken = tokenStore.getRefreshToken(req.user.id)
  if (!refreshToken) {
    res.status(403).end()
    return
  } // TODO: Handle on client. Redirect or link to consent.
  res.locals.accessToken = tokenStore.getAccessToken(refreshToken)
  next()
})

router.get('/projects', (req, res) => {
  const path = 'https://cloudresourcemanager.googleapis.com/v1/projects'
  const config = {
    headers: {
      Authorization: `Bearer ${res.locals.accessToken}`
    }
  };
  return axios(path, config).then(response => {
    const projects = response.data.projects
    if (!projects) {
      res.status(404).end()
    } else {
      res.json(projects)
    }
  }).catch(e => {
    const error = e.response.data.error
    if(error.code == 403) {
      if(error.message.includes('Cloud Resource Manager API has not been used in project')) {
        console.log(error.message)
      }
    }
  })
})

module.exports = router;

import * as axios from 'axios'
import * as express from 'express'

export const router = express.Router({
  mergeParams: true
});

router.use('/', (req, res, next) => {
  const project = req.params.project
  if (project === undefined || project === null) {
    res.status(400).send("Project ID not supplied").end()
    return
  }
  next()
})

router.get('/service', (req, res) => {
  const projectId = req.params.project
  const path = `https://appengine.googleapis.com/v1/apps/${projectId}/services`
  const config = {
    headers: {
      Authorization: `Bearer ${res.locals.accessToken}`
    }
  };
  return axios(path, config).then(response => {
    const services = response.data.services
    if (!services) {
      res.status(404).end()
    } else {
      res.json(services)
    }
  }).catch(e => {
    const error = e.response.data.error
    if (error.code == 403) {
      if (error.message.includes('API has not been used in project')) {
        console.log(error.message)
      }
    }
    res.status(error.code).end()
  })
})

router.get('/service/:service/version', (req, res) => {
  const projectId = req.params.project
  const serviceId = req.params.service
  if (serviceId === undefined || serviceId === null) {
    res.status(400).send("Service ID not supplied").end()
    return
  }

  const path = `https://appengine.googleapis.com/v1/apps/${projectId}/services/${serviceId}/versions`
  const config = {
    headers: {
      Authorization: `Bearer ${res.locals.accessToken}`
    }
  };
  return axios(path, config).then(response => {
    const versions = response.data.versions
    if (!versions) {
      res.status(404).end()
    } else {
      res.json(versions)
    }
  }).catch(e => {
    const error = e.response.data.error
    if (error.code == 403) {
      if (error.message.includes('API has not been used in project')) {
        console.log(error.message)
      }
    }
    res.status(error.code).end()
  })
})


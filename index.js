const port = 8080
const connection = require('./db/mySqlWrapper')
const accessTokenDBHelper = require('./db/accessTokensDBHelper')(connection)
const userDBHelper = require('./db/userDBHelper')(connection)
const oAuthModel = require('./authorisation/accessTokenModel')(userDBHelper, accessTokenDBHelper)
const oAuth2Server = require('node-oauth2-server')
const express = require('express')
const router = express.Router()
const app = express()
app.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['password'],
  debug: true
})

const restrictedAreaRoutesMethods = require('./restrictedArea/restrictedAreaRoutesMethods.js')
const restrictedAreaRoutes = require('./restrictedArea/restrictedAreaRoutes.js')(router, app, restrictedAreaRoutesMethods)
const authRoutesMethods = require('./authorisation/authRoutesMethods')(userDBHelper)
const authRoutes = require('./authorisation/authRoutes')(router, app, authRoutesMethods)
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(app.oauth.errorHandler())
//set the authRoutes for registration and & login request
app.use('/auth', authRoutes)
//set the restrictedAreaRoutes used to demo the accesiblity or routes that ar OAuth2 protected
app.use('/restrictedArea', restrictedAreaRoutes)
app.listen(port, () => {

   console.log(`listening on port ${port}`)
})

module.exports =  (router, app, restrictedAreaRoutesMethods) => {

    //route for entering into the restricted area after login.
    router.post('/enter',  app.oauth.authorise(), restrictedAreaRoutesMethods.accessRestrictedArea)

    return router
}

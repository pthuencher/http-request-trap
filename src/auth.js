function authenticate(req, res, next) {
    // -----------------------------------------------------------------------
    // Authentication Middleware
    //------------------------------------------------------------------------

    var creds = req.app.locals.credentials
  
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  
    // verify credentials
    if (login && password && login === creds.login && password === creds.password) {
      // Access granted...
      return next()
    }
  
    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message
    console.log("Authentication failed.")
  
    // -----------------------------------------------------------------------
  
}

module.exports = authenticate
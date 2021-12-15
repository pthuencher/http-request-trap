const express = require('express')

// local imports
var capture = require('./src/capture')
var redirect = require('./src/redirect')
var serve = require('./src/serve')
var dashboard = require('./src/dashboard')
var auth = require('./src/auth')
var reset = require('./src/reset')

class HTTPReqestTrap {

    constructor(port, credentials, ip='localhost') {
      this.server = express()
      this.server.locals = {
          ip: ip,
          port: port,
          credentials: credentials,
          requests: [],
          redirects: [],
          redirect_url: "http://" + ip + ":" + port + "/trap",
          serve_content: "itworks"
      }

      this.setup()
    }

    setup() {

        // set view engine
        this.server.set('view engine', 'pug')

        // serve static files
        this.server.use(express.static('public/static'))

        // use parser for body data
        const bodyParser = require('body-parser')
        this.server.use(bodyParser.urlencoded({ extended: false }))

        // redirect requests
        this.server.all('/redirect', redirect)

        // serve content
        this.server.all('/serve', serve)

        // capture requests
        this.server.all('/trap', capture)

        // require authentication for all endpoints below
        this.server.use(auth)

        // dashboard
        this.server.get('/dashboard', dashboard.view)
        this.server.get('/dashboard/trap', dashboard.view_trap)
        this.server.get('/dashboard/redirect', dashboard.view_redirect)
        this.server.get('/dashboard/serve', dashboard.view_serve)

        // reset (delete all captured request)
        this.server.post('/reset', reset)

        // settings
        this.server.post('/settings', dashboard.post)
    }

    listen() {
        this.server.listen(this.server.locals.port, () => {
            console.log(`Example app listening at http://${this.server.locals.ip}:${this.server.locals.port}`)
        })
    }
}

module.exports = HTTPReqestTrap

// Just for demo purposes
if (require.main === module) {

    console.log(`
        WARNING: do not directly run this on a port that is exposed to the internet!      
        Make sure the port and credentials are setup correctly first!      
    `)

    var app = new HTTPReqestTrap(1234, { login: 'admin', password: 'admin' })
    app.listen()
}

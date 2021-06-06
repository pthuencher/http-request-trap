const express = require('express')

// local imports
var settings = require('./src/settings')
var capture = require('./src/capture')
var redirect = require('./src/redirect')
var serve = require('./src/serve')
var view = require('./src/view')
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

        // require authentication
        // display all captured requests
        this.server.use(auth)
        this.server.get('/', view)
        // reset (delete all captured request)
        this.server.post('/reset', reset)
        // settings
        this.server.get('/settings', settings.get)
        this.server.post('/settings', settings.post)
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

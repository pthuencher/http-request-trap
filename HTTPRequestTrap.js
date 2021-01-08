const express = require('express')

// local imports
var capture = require('./src/capture')
var view = require('./src/view')
var auth = require('./src/auth')

class HTTPReqestTrap {

    constructor(port, creds) {
      this.server = express()
      this.server.locals.port = this.port = port
      this.server.locals.creds = creds
      this.server.locals.requests = []

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

        // capture requests
        // POST /* (all POST requests)
        this.server.all('/trap', capture)

        // require authentication
        // display all captured requests
        this.server.use(auth)
        this.server.get('/', view)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
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

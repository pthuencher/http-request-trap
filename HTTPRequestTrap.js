const express = require('express')

// local imports
var capture = require('./src/capture')
var view = require('./src/view')
var auth = require('./src/auth')

class HTTPReqestTrap {

    constructor(port, creds) {
      this.port = port
      this.server = express()
      this.server.locals.creds = creds
      this.server.locals.requests = []

      this.setup()
    }

    setup() {

        // use parser for body data
        const bodyParser = require('body-parser')
        this.server.use(bodyParser.urlencoded({ extended: false }))

        // capture requests
        // POST /* (all POST requests)
        this.server.post('*', capture)
        // GET /trap (in case only GET is possible)
        this.server.get('/trap', capture)

        // require authentication for request inspection
        this.server.use('/view', auth)
        // display all captured requests
        this.server.get('/view', view)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = HTTPReqestTrap

if (require.main === module) {
    var app = new HTTPReqestTrap(1234, { login: 'admin', password: 'admin' })
    app.listen()
}

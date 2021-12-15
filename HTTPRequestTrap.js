const express = require('express')

// request handlers
var capture = require('./src/capture')
var redirect = require('./src/redirect')
var serve = require('./src/serve')
var dashboard = require('./src/dashboard')
var auth = require('./src/auth')

class HTTPReqestTrap {

    constructor(port, credentials, ip='localhost') {
        this.server = express()
        this.server.locals = {
            ip: ip,
            port: port,
            credentials: credentials,
            request_id: 1,
            requests: [],
            redirects: { 
                trap: { dest: "/trap", requests: [] },
                google: { dest: "https://google.com", requests: [] },
                ard: { dest: "https://ard.de", requests: [] } 
            },
            serves: {
                test: { content: "!! it works !!", requests: [] },
                alert: { content: "<html><head/><body><script>alert('0ops!')</script></body></html>", requests: [] },
            }
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

        // capture requests
        this.server.all('/trap', capture)

        // redirect requests
        this.server.all('/redirect/:id', redirect)

        // serve content
        this.server.all('/serve/:id', serve)

        // require authentication for all dashboard endpoints
        this.server.use('/dashboard/.+', auth)
        this.server.get('/dashboard/:feature', dashboard)
        this.server.post('/dashboard/:feature', dashboard)

        // return 404 for any other endpoint
        this.server.all('*', (req, res) => { res.sendStatus(404); })

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

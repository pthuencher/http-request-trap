const express = require('express')

class HTTPReqestTrap {

    constructor(port) {
      this.port = port
      this.server = express()
      this.server.locals.requests = []

      this.setup()
    }

    setup() {

        // parse body data
        const bodyParser = require('body-parser')
        this.server.use(bodyParser.urlencoded())

        // view all captured requests
        var view = require('./src/view')
        var auth = require('./src/auth')
        // TODO: avoid auth on /view for method POST, PUT, ...
        this.server.use('/view', auth)
        this.server.get('/view', view)

        // capture request and reply with {'success': 'true'}
        var capture = require('./src/capture')
        this.server.all('*', capture)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = HTTPReqestTrap

if (require.main === module) {
    var app = new HTTPReqestTrap(1234)
    app.listen()
}

var authenticate = require('./auth')

function view(req, res) {
    console.log(`GET /view`)
    var reqs = req.app.locals.requests

    resp = ""
    resp += `Captured ${reqs.length} requests.\n`

    reqs.forEach((data) => {
        resp += JSON.stringify(data)
        resp += "\n"
    })

    res.send(resp)
}

module.exports = view
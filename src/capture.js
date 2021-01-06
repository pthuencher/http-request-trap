function capture(req, res) {
    var reqs = req.app.locals.requests

    var data = {
        index: reqs.length,
        headers: req.headers,
        body: req.body,
    }

    reqs.push(data)
    res.send({"success": "true"})
    console.log(`Captured Request.`)
}

module.exports = capture
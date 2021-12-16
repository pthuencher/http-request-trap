function capture(req, res) {
    // -----------------------------------------------------------------------
    // Capture Middleware
    //------------------------------------------------------------------------

    var reqs = req.app.locals.requests

    var now = new Date()
    var req_data = {
        id: req.app.locals.request_id++,
        date: now,
        dateUTCStr: now.toUTCString(),
        remoteAddress: req.connection.remoteAddress,
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body
    }

    reqs.push(req_data)

    res.set("Access-Control-Allow-Origin", "*")
    res.send({"success": "true"})
    console.log(`Captured ${req_data.method.toUpperCase()} ${req_data.url} from ${req_data.remoteAddress}`)
}

module.exports = capture
function capture(req, res) {
    // -----------------------------------------------------------------------
    // Capturing Middleware
    //------------------------------------------------------------------------

    var reqs = req.app.locals.requests

    var now = new Date()
    var data = {
        index: reqs.length,
        date: now,
        dateUTCStr: now.toUTCString(),
        method: req.method,
        url: req.originalUrl,
        remoteAddress: req.connection.remoteAddress,
        headers: req.headers,
        body: JSON.stringify(req.body, null, 4),
    }

    reqs.push(data)
    res.set("Access-Control-Allow-Origin", "*")
    res.send({"success": "true"})
    console.log(`Captured ${data.method.toUpperCase()} ${data.url}`)
}

module.exports = capture
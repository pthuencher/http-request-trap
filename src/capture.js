function capture(req, res) {
    // -----------------------------------------------------------------------
    // Capture Middleware
    //------------------------------------------------------------------------

    var reqs = req.app.locals.requests

    var now = new Date()
    var data = {
        index: reqs.length + 1,
        date: now,
        dateUTCStr: now.toUTCString(),
        remoteAddress: req.connection.remoteAddress,
        info: {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body
        }
    }

    data.info_json_str = JSON.stringify(data.info, null, 4);
    reqs.push(data)

    res.set("Access-Control-Allow-Origin", "*")
    res.send({"success": "true"})
    console.log(`Captured ${data.info.method.toUpperCase()} ${data.info.url}`)
}

module.exports = capture
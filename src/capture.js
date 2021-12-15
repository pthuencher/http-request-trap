function capture(req, res) {
    // -----------------------------------------------------------------------
    // Capture Middleware
    //------------------------------------------------------------------------

    var reqs = req.app.locals.requests

    var now = new Date()
    var req_data = {
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

    req_data.info_json_str = JSON.stringify(req_data.info, null, 4);
    reqs.push(req_data)

    res.set("Access-Control-Allow-Origin", "*")
    res.send({"success": "true"})
    console.log(`Captured ${req_data.info.method.toUpperCase()} ${req_data.info.url} from ${req_data.remoteAddress}`)
}

module.exports = capture
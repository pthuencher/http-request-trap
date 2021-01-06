function capture(req, res) {
    // -----------------------------------------------------------------------
    // Capturing Middleware
    //------------------------------------------------------------------------

    var reqs = req.app.locals.requests

    var data = {
        index: reqs.length,
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
    }

    reqs.push(data)
    res.send({"success": "true"})
    console.log(`Captured ${data.method.toUpperCase()} ${data.url}`)
}

module.exports = capture
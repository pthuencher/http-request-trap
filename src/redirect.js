function redirect(req, res, next) {
    // -----------------------------------------------------------------------
    // Redirect Middleware
    //------------------------------------------------------------------------

    var redirects = req.app.locals.redirects
    var id = req.params.id

    if (!(id in redirects)) {
        //- Unknown redirect id
        next()
    }
    else {
        var entry = redirects[id]

        var now = new Date()
        var req_data = {
            date: now,
            dateUTCStr: now.toUTCString(),
            remoteAddress: req.connection.remoteAddress
        }
    
        entry.requests.push(req_data)
    
        res.header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.header("Pragma: no-cache"); // HTTP 1.0.
        res.header("Expires: 0"); // Proxies.
        res.redirect(302, entry.dest)
        console.log(`Redirect ${req_data.remoteAddress} to ${entry.dest}`)
    }



}

module.exports = redirect
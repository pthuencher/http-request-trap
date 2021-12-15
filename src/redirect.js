function redirect(req, res) {
    // -----------------------------------------------------------------------
    // Redirect Middleware
    //------------------------------------------------------------------------

    var redirect_url = req.app.locals.redirect_url
    var redirects = req.app.locals.redirects

    var now = new Date()
    var data = {
        index: redirects.length + 1,
        date: now,
        dateUTCStr: now.toUTCString(),
        remoteAddress: req.connection.remoteAddress,
        destination: redirect_url
    }

    redirects.push(data)

    res.header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.header("Pragma: no-cache"); // HTTP 1.0.
    res.header("Expires: 0"); // Proxies.
    res.redirect(302, redirect_url)
    console.log(`Redirect ${data.remoteAddress} to ${data.destination}`)
}

module.exports = redirect
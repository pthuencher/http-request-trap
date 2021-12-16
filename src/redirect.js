function redirect(req, res, next) {
    // -----------------------------------------------------------------------
    // Redirect Middleware
    //------------------------------------------------------------------------

    var redirects = req.app.locals.redirects
    var id = req.params.id

    if (!(id in redirects)) {
        //- Unknown redirect id
        return next()
    }
    else {
    
        res.header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.header("Pragma: no-cache"); // HTTP 1.0.
        res.header("Expires: 0"); // Proxies.

        res.redirect(302, redirects[id])
        console.log(`Redirect ${req.connection.remoteAddress} to ${redirects[id]}`)
    }



}

module.exports = redirect
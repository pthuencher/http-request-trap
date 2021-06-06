function redirect(req, res) {
    // -----------------------------------------------------------------------
    // Redirect Middleware
    //------------------------------------------------------------------------

    var redirect_url = req.app.locals.redirect_url

    res.redirect(301, redirect_url)
    console.log(`Redirect ${req.connection.remoteAddress} to ${redirect_url}`)
}

module.exports = redirect
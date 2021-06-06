function serve(req, res) {
    // -----------------------------------------------------------------------
    // Redirect Middleware
    //------------------------------------------------------------------------

    var serve_content = req.app.locals.serve_content

    res.send(serve_content)
    console.log(`Serving content to ${req.connection.remoteAddress}`)
}

module.exports = serve
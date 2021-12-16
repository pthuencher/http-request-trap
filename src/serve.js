function serve(req, res, next) {
    // -----------------------------------------------------------------------
    // Redirect Middleware
    //------------------------------------------------------------------------

    var serves = req.app.locals.serves
    var id = req.params.id

    if (!(id in serves)) {
        return next()
    }
    else {

        res.send(serves[id])
        console.log(`Serve content of ${id} to ${req.connection.remoteAddress}`)
    }
    
}

module.exports = serve
function serve(req, res, next) {
    // -----------------------------------------------------------------------
    // Redirect Middleware
    //------------------------------------------------------------------------

    var serves = req.app.locals.serves
    var id = req.params.id

    if (!(id in serves)) {
        next()
    }
    else {
        var entry = serves[id]
        
        var now = new Date()
        var req_data = {
            date: now,
            dateUTCStr: now.toUTCString(),
            remoteAddress: req.connection.remoteAddress
        }
    
        entry.requests.push(req_data)

        res.send(entry.content)
        console.log(`Serve content of ${id} to ${req_data.remoteAddress}`)
    }
    
}

module.exports = serve
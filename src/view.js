function view(req, res) {
    // -----------------------------------------------------------------------
    // View Middleware
    //------------------------------------------------------------------------
    
    // Get requests (recently -> old)
    var reqs = [...req.app.locals.requests].reverse()

    if (req.query.format && req.query.format == "json") {
        // return json
        res.send(reqs)
    }
    else {
        // render HTML page
        res.render('view', { locals: req.app.locals, reqs: reqs })
    }
    
}

module.exports = view
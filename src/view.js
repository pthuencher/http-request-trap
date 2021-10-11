function view(req, res) {
    // -----------------------------------------------------------------------
    // View Middleware
    //------------------------------------------------------------------------
    var page = req.query.page;

    if (page == 'redirect') {
        res.render('redirect', { locals: req.app.locals })
    }
    else if (page == 'serve') {
        res.render('serve', { locals: req.app.locals })
    }
    else {
        // Get requests (recently -> old)
        var reqs = [...req.app.locals.requests].reverse()

        if (req.query.format && req.query.format == "json") {
            // return json
            res.send(reqs)
        }
        else {
            // render HTML page
            res.render('trap', { locals: req.app.locals, reqs: reqs })
        }
    }  
}

module.exports = view
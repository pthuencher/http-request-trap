function dashboard(req, res, next) {
    // -----------------------------------------------------------------------
    // Dashboard Middleware
    //------------------------------------------------------------------------

    var feature = req.params.feature

    if (feature === "trap") {
        // Get requests (recently -> old)
        var reqs = [...req.app.locals.requests].reverse()

        if (req.query.format && req.query.format == "json") {
            // return json
            res.send(reqs)
        }
        else {
            // render HTML page
            res.render('dashboard/trap', { locals: req.app.locals, reqs: reqs })
        }
    }
    else if (feature === "redirect") {
        res.render('dashboard/redirect', { locals: req.app.locals })
    }
    else if (feature === "serve") {
        res.render('dashboard/serve', { locals: req.app.locals })
    }
    else {
        next()
    }

}

module.exports = dashboard
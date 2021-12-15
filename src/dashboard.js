function view(req, res) {
    // -----------------------------------------------------------------------
    // View Middleware
    //------------------------------------------------------------------------

    res.render('dashboard', { locals: req.app.locals })

}

function view_trap(req, res) {
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

function view_redirect(req, res) {
    // Get requests (recently -> old)
    res.render('redirect', { locals: req.app.locals })
}

function view_serve(req, res) {
    res.render('serve', { locals: req.app.locals })
}


function post(req, res) {
    // -----------------------------------------------------------------------
    // Settings (POST) Middleware
    //------------------------------------------------------------------------
    
    if (req.body.redirect_url) {
        req.app.locals.redirect_url = req.body.redirect_url
        res.render('redirect', { locals: req.app.locals })
    }

    if (req.body.serve_content) {
        req.app.locals.serve_content = req.body.serve_content
        res.render('serve', { locals: req.app.locals })
    }

}

module.exports = {
    view: view,
    view_trap: view_trap,
    view_redirect: view_redirect,
    view_serve: view_serve,
    post: post
}
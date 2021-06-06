function get(req, res) {
    // -----------------------------------------------------------------------
    // Settings (GET) Middleware
    //------------------------------------------------------------------------
    
    res.render('settings', { locals: req.app.locals })
}

function post(req, res) {
    // -----------------------------------------------------------------------
    // Settings (POST) Middleware
    //------------------------------------------------------------------------
    
    if (req.body.redirect_url) {
        req.app.locals.redirect_url = req.body.redirect_url
    }

    if (req.body.serve_content) {
        req.app.locals.serve_content = req.body.serve_content
    }

    res.render('settings', { locals: req.app.locals })
}

module.exports = {
    get: get,
    post: post
}
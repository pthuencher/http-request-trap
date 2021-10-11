
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
    post: post
}
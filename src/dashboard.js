function dashboard(req, res, next) {
    // -----------------------------------------------------------------------
    // Dashboard Middleware
    //------------------------------------------------------------------------

    var feature = req.params.feature
    var method = req.method

    switch(feature) {
        
        case "trap":
            (method === "GET") ? get_trap(req, res, next) : post_trap(req, res, next)
            break

        case "redirect":
            (method === "GET") ? get_redirect(req, res, next) : post_redirect(req, res, next)
            break

        case "serve":
            (method === "GET") ? get_serve(req, res, next) : post_serve(req, res, next)
            break

        default:
            //- Not found
            next()
            break
        
    }

}

function get_trap(req, res, next) {
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

function post_trap(req, res, next) {
    next()
}

function get_redirect(req, res, next) {
    res.render('dashboard/redirect', { locals: req.app.locals })
}

function post_redirect(req, res, next) {
    
    switch(req.body.action) {

        case "add":
            req.app.locals.redirects[req.body.id] = {
                dest: req.body.dest,
                requests: []
            }
            break

        case "delete":

            if (req.body.id in req.app.locals.redirects) {
                delete req.app.locals.redirects[req.body.id]
            }
            break

        default:
            //- Unknown action
            break
    }

    get_redirect(req, res, next)
}

function get_serve(req, res, next) {
    res.render('dashboard/serve', { locals: req.app.locals })
}

function post_serve(req, res, next) {
    
    switch(req.body.action) {

        case "add":
            req.app.locals.serves[req.body.id] = {
                content: req.body.content,
                requests: []
            }
            break

        case "delete":

            if (req.body.id in req.app.locals.serves) {
                delete req.app.locals.serves[req.body.id]
            }
            break

        default:
            //- Unknown action
            break
    }

    get_serve(req, res, next)
}

module.exports = dashboard
function view(req, res) {
    // -----------------------------------------------------------------------
    // View Middleware
    // GET /view
    //------------------------------------------------------------------------
    
    var reqs = req.app.locals.requests

    html = ""

    reqs.forEach((data) => {
        html += JSON.stringify(data, null, 4)
        html += "\n"
    })

    res.send(html)
}

module.exports = view
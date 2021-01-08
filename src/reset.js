function reset(req, res) {
    // -----------------------------------------------------------------------
    // Reset Middleware
    //------------------------------------------------------------------------

    req.app.locals.requests = []

    res.sendStatus(200)
    console.log("Reset");
}

module.exports = reset
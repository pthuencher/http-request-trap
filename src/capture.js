function capture(req, res) {
    var data = {
        headers: req.headers,
        body: req.body,
    };

    req.app.locals.requests.push(data);
    res.send({"success": "true"})
}

module.exports = capture;
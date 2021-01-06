function view(req, res) {
    resp = ""
    resp += `There are ${req.app.locals.requests.length} requests captured.\n`
    req.app.locals.requests.forEach((data) => {
        console.log(data);
        resp += JSON.stringify(data);
    })

    res.send(resp);
}

module.exports = view;
# http-request-trap
NodeJS (express) webserver to capture incoming GET and POST requests

### Run
```
$ nodejs HTTPRequestTrap.js
```

### Send Request
GET:
```
$ curl http://<IP>:<PORT>/trap
```

POST:
```
$ curl http://<IP>:<PORT>/trap -X POST -d "foo=bar"
```

### View Requests
```
$ curl http://<IP>:<PORT> --basic --auth "<username>:<password>"

{
    "index": 0,
    "method": "GET",
    "url": "/trap",
    "headers": {
        "host": "localhost:1234",
        "user-agent": "curl/7.68.0",
        "accept": "*/*"
    },
    "body": {}
}
{
    "index": 1,
    "method": "POST",
    "url": "/trap",
    "headers": {
        "host": "localhost:1234",
        "user-agent": "curl/7.68.0",
        "accept": "*/*",
        "content-length": "20",
        "content-type": "application/x-www-form-urlencoded"
    },
    "body": {
        "foo": "bar"
    }
}

```

# http-request-trap
NodeJS (express) webserver to capture incoming POST requests

### Run
```
$ nodejs HTTPRequestTrap.js
```

### Send Request
GET:
```
$ curl http://localhost/trap
```

POST:
```
$ curl http://localhost -X POST -d "foo=bar"
```

### View Requests
```
$ curl http://localhost/view --basic --auth "admin:admin"

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
    "url": "/",
    "headers": {
        "host": "localhost:1234",
        "user-agent": "curl/7.68.0",
        "accept": "*/*",
        "content-length": "20",
        "content-type": "application/x-www-form-urlencoded"
    },
    "body": {
        "username": "abc",
        "def": "ghi"
    }
}

```

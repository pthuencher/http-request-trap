# http-request-trap
NodeJS (express) webserver to log, redirect and serve HTTP requests.

### Endpoints:
* `/trap`  
Log incoming HTTP request.

* `/dashboard/trap`  
View logged HTTP requests.

* `/redirect/<id>`  
Redirect to preconfigured destination.

* `/dashboard/redirect`  
Configure static redirects.

* `/serve/<id>`  
Serve preconfigured content.

* `/dashboard/serve`  
Configure static content to serve.

**Note:** The `/dashboard` endpoints are protected using HTTP basic authentication. Hence, use of SSL/TLS is recommended.


### Run:
```
$ nodejs HTTPRequestTrap.js
```

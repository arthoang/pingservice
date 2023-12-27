# This is a simple service API to ping a host, written in Javascript using Node.js Express
## Service is run on port 3900 by default.
## API specs
### Request
API call:
```
/ping?host=10.10.0.99
or
/ping?host=google.com
```
Host can be a hostname, or IP. If using IP, it will be local to the hosting server, or public IP

### Response:
```
{
  "status":"online"
  "time":2.12
}

or
{
  "status":"offline"
  "time":0
}
```

There is docker image for easy deployment. Using docker compose as follow:
```
version: "3.8"
services:
...
  pingservice:
    container_name: pingservice
    privileged: true
    restart: always
    image: docker.io/arthoangca/pingservice:latest
    ports:
      - "3900:3900"
    environment:
      REQUEST_LOG_FILE: "pingservice_log.txt"
```

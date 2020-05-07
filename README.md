# Overview
This is a nodejs application that can consume JSON documents to be stored in a standalone redis instance.  

It has the capability to:

* Create entry 
* Update entry 
* Read entry 
* Remove entry 

## Required Nodejs Packages

* redis
* express
* bodyparser

>npm install -g redis express bodyparser

# Quick Setup

Follow these commands to get up and running quickly 

(Assumes that docker and node are running on the same host)

> git pull https://github.com/jarrydkeir/node-redis-api.git

> docker pull redis

> docker run -p 6379:6379 redis

> node app.js

# API Endpoints
This section covers the API endpoints and their use.


### Coming Soon


### TODO - General
* Add SSL capability
* Add Auth methods (OAUTH,Basic)
* add compression for storing in redis
* force content-type and reject content-types that are not json
* Finish API doco
* Error checking
* pretty error messages


### TODO - API Endpoints
* Flushall
* Exists
* PEXPIRE
* PEXPIREAT
* PERSIST
* RENAME
* Search Keys
* SORT
* TTL 
* GETSET - 
* Hash Get
* Hash Exists
* Hash Get all
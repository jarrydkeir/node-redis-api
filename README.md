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
* Think about required response headers
* Postman collection
* Add SSL capability
* Add Auth methods (OAUTH,Basic) for API
* Add Auth for Mongo
* add compression for storing in redis
* force content-type and reject content-types that are not as the as the defined type
* Finish API doco
* Error checking
* pretty error messages


### TODO - API Endpoints
* Flushall - deletes all keys in database - return 204
* DEL - Delete key - return 204
* Exists - check if key exists - 200 present - 404 not present
* Append - update existing key - return 200
* SETEX - set key with expiry time
* EXPIRE - set expiry time in secs from now on pre-existing key (PEXPIRE - milliseconds)
* EXPIREAT - set expiry time - calc secs from today to provided date - validation required for dates that are less than today (PEXIPREAT - milliseconds)
* PERSIST - remove TTL on key
* RENAME - rename key
* Search Keys - search keys same as exists
* SORT - may not be required
* TTL - Check TTL on key (secs) - maybe add formatting date.now + time UTC
* GETSET - provide new data set for key and return old dataset
* HGET
* HEXISTS
* HKEYS
* HDEL
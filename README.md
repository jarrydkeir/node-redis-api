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

# WPI - API Endpoints
This section covers the API endpoints and their use.

* /keys
    - GET - Retrieves all keys
    - DELETE - Deletes all keys

* /keys/:id
    - GET - Retrieve value from key
    - POST - Create value at key
    - PUT - Update value at key
    - DELETE - Remove key

* /keys/:id?rename=:newId
    - PUT - Rename key

* /key/:id?TTL=3600
    - POST - Create key with a Time to live of 3600 seconds (1 hour)
    - PUT - Update a keys with a new Time to live value

* /key/:id?expireAt=2020-04-05T00:00:00Z
    - POST - Create key that expires at 2020-04-05T00:00:00Z
    - PUT - Update a key to expire at 2020-04-05T00:00:00Z

* /key/:id?removeTTL=true
    - PUT - Remove Time to Live for existing key


### TODO - General
* Think about required response headers
* Postman collection
* Add SSL capability
* Add Auth methods (Basic) for API
* Add Auth for redis
* add compression for storing in redis
* force content-type and reject content-types that are not as the defined type
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
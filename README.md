# Overview

This is a nodejs application that can consume JSON documents to be stored in a standalone redis instance.  

## Required Nodejs Packages

* redis
* express
* bodyparser
* compression

>npm install -g redis express bodyparser compression

## Quick Setup

Follow these commands to get up and running quickly 

(Assumes that docker and node are running on the same host)

> git pull https://github.com/jarrydkeir/node-redis-api.git;
> docker pull redis;
> docker run -p 6379:6379 redis;
> node app.js;

## API Endpoints

This section covers the API endpoints and their use.

Where ever :id is used it requires a unique key for redis

* /keys
  * GET - Retrieves all keys
  * DELETE - Deletes all keys
  * PUT - Unsupported HTTP Method
  * POST - Unsupported HTTP Method

* /keys/:id
  * GET - Retrieve value from key
  * POST - Create value at key
  * PUT - Update value at key
  * DELETE - Remove key

* /keys/:id?rename=:newId
  * PUT - Rename key
  * GET - Unsupported HTTP Method
  * POST - Unsupported HTTP Method
  * DELETE - Unsupported HTTP Method

* /key/:id?TTL=3600
  * POST - Create key with a Time to live of 3600 seconds (1 hour)
  * PUT - Update a keys with a new Time to live value

* /key/:id?expireAt=2020-04-05T00:00:00Z
  * POST - Create key that expires at 2020-04-05T00:00:00Z
  * PUT - Update a key to expire at 2020-04-05T00:00:00Z

* /key/:id?removeTTL=true
  * PUT - Remove Time to Live for existing key

* /hash
  * GET - Retrieves all hashs
  * DELETE - Deletes all hashs

* /hash/:id
  * GET - Retrieve value from hash
  * POST - Create value at hash
  * PUT - Update value at hash
  * DELETE - Remove hash

* /hash/:id?rename=:newId
  * PUT - Rename hash

* /hash/:id?TTL=3600
  * POST - Create hash with a Time to live of 3600 seconds (1 hour)
  * PUT - Update a hash with a new Time to live value

* /hash/:id?expireAt=2020-04-05T00:00:00Z
  * POST - Create hash that expires at 2020-04-05T00:00:00Z
  * PUT - Update a hash to expire at 2020-04-05T00:00:00Z

* /hash/:id?removeTTL=true
  * PUT - Remove Time to Live for existing hash

## TODO - General

* Think about required response headers
* Postman collection
* Add SSL capability
* Add Auth methods (Basic) for API
* Add Auth for redis
* ~~add compression for storing in redis~~
* ~~force content-type and reject content-types that are not as the defined type~~
* Finish API doco
* Error checking
* ~~pretty error messages~~
* ~~handle unsupported HTTP methods~~
* Investigate express.router (see how params work specifically)

## TODO - API Endpoints

* SETEX - set key with expiry time
* EXPIRE - set expiry time in secs from now on pre-existing key (PEXPIRE - milliseconds)
* EXPIREAT - set expiry time - calc secs from today to provided date - validation required for dates that are less than today (PEXIPREAT - milliseconds)
* PERSIST - remove TTL on key
* RENAME - rename key
* Search Keys - search keys same as exists
* TTL - Check TTL on key (secs) - maybe add formatting date.now + time UTC
* GETSET - provide new data set for key and return old dataset
* HGET
* HEXISTS
* HKEYS
* HDEL

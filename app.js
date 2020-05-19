var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');
var compression = require('compression');
var app_redis = redis.createClient();
var app = express();
var fs = require("fs");
app.use(bodyParser.json());
app.use(compression());

// /key grouping
app.get('/keys',function(req, res) {

    res_redis = app_redis.keys('*', function(redisKeysError, redisKeysResult)
    {
        if (redisKeysError) 
        {
            res.status(500).send(redisKeysError);
        }
        res.status(200).json(redisKeysResult);  
    })
})

app.delete('/keys', function(req,res) {
    app_redis.flushall(function(redisDeleteAllError, redisDeleteAllResult){
        if (redisDeleteAllError){
            //Do something not sure what - send back error??
        }
        res.status(204).send(redisDeleteAllResult);
    })

})

app.post('/keys', function(req,res){
    res.status(405).json({"error":"Method Not Allowed","detail":"Please provide new key name to create a new key"})
})

app.put('/keys', function(req,res)
{
    res.status(405).json({"error":"Method Not Allowed","detail":"Please provide pre-existing key to update"})
})


// /key/:id grouping
 app.post('/keys/:id', function(req, res) 
 {
    if (req.header("Content-Type") == 'application/json') 
    {   
    app_redis.get(req.params.id, function (redisGetError,redisGetResult) {
        if (redisGetResult == 0) {
            res.status(400).json({"error":"Key Does Not Exists","details":"The provided Key does not exist, if you want to create this key please use HTTP Method POST"})

        } if (redisGetResult == 1) {
            app_redis.set(req.params.id,JSON.stringify(req.body,null,2)); // add check to ensure that key has been set
            redis_res = app_redis.get(req.params.id, function (redisGetError,redisGetResult) {
                if (redisGetError) {
                    console.log(redisGetError);
                    throw redisGetError;
                }
                res.status(200).json(JSON.parse(redisGetResult));
            });
        }
    })
    } else {
        res.status(415).json({"error":"Media Type Not Supported","details":"Content-Type not supported. Make sure that provided value is JSON and Content-Type is set to application/json"})
    }
 })

 app.put('/keys/:id', function(req, res) 
 {
    if (req.header("Content-Type") == 'application/json') 
    {   
    app_redis.get(req.params.id, function (redisGetError,redisGetResult) {
        if (redisGetResult) {
            res.status(400).json({"error":"Key Exists","details":"A key / value pair already exists, if you want to update this key please use HTTP Method PUT"})

        } else {
            app_redis.set(req.params.id,JSON.stringify(req.body,null,2)); // add check to ensure that key has been set
            redis_res = app_redis.get(req.params.id, function (redisGetError,redisGetResult) {
                if (redisGetError) {
                    console.log(redisGetError);
                    throw redisGetError;
                }
                res.status(200).json(JSON.parse(redisGetResult));
            });
        }
    })
    } else {
        res.status(415).json({"error":"Media Type Not Supported","details":"Content-Type not supported. Make sure that provided value is JSON and Content-Type is set to application/json"})
    }
 })

 app.get('/keys/:id', function(req,res) 
 {

    redis_res = app_redis.exists(req.params.id, function(redisExistError, redisExistResult)
        {
            if (result=='0') 
            {
                res.status(404).json({"error":"Not found","details":"Key is not found"});
            }
            if (result=='1')
            {
            redis_res = app_redis.get(req.params.id, function (redisGetError,redisGetResult) {
                if (redisGetError) {
                    res.status(500).json(redisGetError);
                } if (redisGetResult !== null)
                {
                res.status(200).json(JSON.parse(redisGetResult));
                } else
                {
                    res.status(204).json();
                }
            });
            }
        })
    })

 app.delete('/keys/:id', function(req,res) {
    if (req.params.id !==null) {
        redis_res = app_redis.exists(req.params.id, function(redisExistError, redisExistResult)
        {
            if (result=='0') 
            {
                res.status(404).json({"error":"Not found","details":"Key is not found"});
            }
            if (result=='1') {
                app_redis.del(req.params.id, function(redisDelKeyError, redisDelKeyResult) {
                    res.status(204).json();
        }
        )
    }
})

 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Node-Redis listening at http://%s:%s", host, port)
 })
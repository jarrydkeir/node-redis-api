var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');
var app_redis = redis.createClient();
var app = express();
var fs = require("fs");
app.use(bodyParser.json());

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
    app_redis.flushall;
    res.status(204).send();
})

app.post('/keys', function(req,res){
    res.status(405).json({"error":"Method Not Allowed"})
})



// /key/:id grouping
 app.post('/keys/:id', function(req, res) {
     //TODO Compress Json before storing
     //TODO check content-type reject if not - add content type as const so it can be flexible
    app_redis.set(req.params.id,JSON.stringify(req.body,null,2));
    redis_res = app_redis.get(req.params.id, function (error,result) {
        if (error) {
            console.log(error);
            throw error;
        }
        res.setHeader('Content-Type','application/json');
        res.send(result);
    });
 })

 app.get('/keys/:id', function(req,res) {
     //TODO - Check content-type

    redis_res = app_redis.exists(req.params.id, function(error, result){
        if (result=='0') {
            res.status(404).send();
        }
        if (result=='1'){
        redis_res = app_redis.get(req.params.id, function (error,result) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } if (result !== null){
                //TODO Move content-type to const
            res.setHeader('Content-Type','application/json');
            res.send(result);
        }
        });
    }})
    
 })

 app.delete('/keys/:id', function(req,res) {
    if (req.params.id !==null) {
        //validate key then delete
        app_redis.del(req.params.id, function(redisDelKeyError, redisDelKeyResult)
        {
            
        }
        )
    }
})

 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Node-Redis listening at http://%s:%s", host, port)
 })
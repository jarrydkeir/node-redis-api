var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');
var app_redis = redis.createClient();
var app = express();
var fs = require("fs");
app.use(bodyParser.json());


///redis/value grouping
 app.post('/redis/value/:id', function(req, res) {
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

 app.get('/redis/value/:id', function(req,res) {
    redis_res = app_redis.exists(req.params.id, function(error, result){
        if (result=='0') {
            res.status(404).send();
        }
        if (result=='1'){
        redis_res = app_redis.get(req.params.id, function (error,result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            res.setHeader('Content-Type','application/json');
            res.send(result);
        });
    }})
    
 })

 //redis/key grouping
 app.get('/redis/key/:id', function(req,res) {
    redis_res = app_redis.exists(req.params.id, function(error, result){
        if (result=='0') {
            res.status(404).send();
        }
        if (result=='1'){
        redis_res = app_redis.get(req.params.id, function (error,result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            res.setHeader('Content-Type','application/json');
            res.send(result);
        });
    }})
    
 })

 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Node-Redis listening at http://%s:%s", host, port)
 })
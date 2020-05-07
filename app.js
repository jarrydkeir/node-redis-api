var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');
var app_redis = redis.createClient('6379','172.17.0.2');
var app = express();
var fs = require("fs");
app.use(bodyParser.json());

 app.post('/addKey/:id', function(req, res) {
    console.log(JSON.stringify(req.body,null,2));
    app_redis.set(req.params.id,JSON.stringify(req.body,null,2));
    //console.log(app_redis.get(req.params.id, redis.print));
    redis_res = app_redis.get(req.params.id, redis.print);
    res.send(redis_res);
 })
 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Node-Redis listening at http://%s:%s", host, port)
 })
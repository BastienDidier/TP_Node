/**
 * Module dependencies.
 */
var express = require('express');
var config = require('./config/config.js');
var mongoose = require("mongoose");
var async=require("async");
var request=require("request");

var path = require("path");
var fs = require("fs");
var pid = process.pid;

var connected = false;

mongoose.connect("mongodb://localhost:27017/tutoejs");
mongoose.connection.on("error", function (err) {
    console.log(err);
    process.exit(0);
});

mongoose.connection.on("connected", function () {
    console.log("[APP] Mongo connected");
});


/**
 * Read configuration file
 **/
if (!config) {
    logger.log("[APP] Startup error : No configuration to launch");
    process.exit(0);
}


/**
 * Create Express server.
 */

var app = express();
app.set('port', config.port);

console.log("__dirname : "+__dirname);
console.log(path.join(__dirname,'public'))
app.use(express.static(path.join(__dirname,'public')));
app.use(require("./router/Router.js")(express.Router()));


/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {


    console.log("PID=" + pid);
    console.log("[APP] Startup success: " + "Server listening on " + app.get("port") + " and pid is " + pid);

});

module.exports = app;

/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

var redis = require("redis"),
    client1 = redis.createClient(6379, '137.135.204.110'),
    client2 = redis.createClient(6379, '137.135.204.110'),
    msg_count = 0;

client1.on("error", function (err) {
    console.log("Error " + err);
});

client1.subscribe("teddy:hears");

// Setup server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    client1.on("message", function (channel, message) {
        io.emit('chat message', message + "from channel" + channel);
        msg_count += 1;
        if (msg_count === 100) {
            client1.unsubscribe();
            client1.end();
            client2.end();
        }
    });

    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        client2.publish("teddy:hears", msg);
    });
});

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


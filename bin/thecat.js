#!/usr/bin/env node

'use strict';

var http = require('http');
var express = require('express');
var thacat = require('..');
var PORT = 1234;
var app = express();

http.createServer(app).listen(PORT);

console.log('server:' + PORT);

app.get('/', function(req, res) {
    res.redirect('/cat.png');
});

app.use(thacat({
    prefix: '/cat.png'
}));


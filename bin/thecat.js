#!/usr/bin/env node

'use strict';

var http        = require('http'),
    express     = require('express'),
    thacat      = require('..'),
    PORT        = 1234,
    app         = express();

http.createServer(app).listen(PORT);

console.log('server:' + PORT);

app.get('/', function(req, res) {
    res.redirect('/cat.png');
});

app.use(thacat({
    prefix: '/cat.png'
}));


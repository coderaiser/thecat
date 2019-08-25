#!/usr/bin/env node

'use strict';

const http = require('http');
const express = require('express');
const thacat = require('..');
const PORT = 1234;
const app = express();

http.createServer(app).listen(PORT);

console.log('server:' + PORT);

app.get('/', (req, res) => {
    res.redirect('/cat.png');
});

app.use(thacat({
    prefix: '/cat.png',
}));


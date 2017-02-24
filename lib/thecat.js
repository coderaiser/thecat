'use strict';

var fs = require('fs');

var mime = require('mime');
var files = require('files-io');
var ponse = require('ponse');

var dir = __dirname + '/../img/';

module.exports = function(options) {
    if (!options)
        options = {
            prefix : '/cat.png'
        };
    
    return middle.bind(null, options);
};

function middle(options, req, res, next) {
    var prefix = options.prefix;
    var pathName = ponse.getPathName(req);
    var regExp = new RegExp('^' + prefix + '$');
    var is = regExp.test(pathName);
    
    if (!is)
        return next();
    
    fs.readdir(dir, function(error, files) {
        if (error)
            return res.send(error);
        
        var ONE_HOUR    = 3600;
        var count = files.length -1;
        var random = count * Math.random();
        var number = Math.round(random);
        var name = files[number];
        var path = dir + name;
        var type = mime.lookup(path);
        
        res.contentType(type);
        res.setHeader('Cache-Control', 'public, max-age=' + ONE_HOUR);
        
        sendFile(res, path);
    });
}

function sendFile(res, name) {
    files.pipe(name, res, function(error) {
        if (error)
            res.send(error, 404);
    });
}


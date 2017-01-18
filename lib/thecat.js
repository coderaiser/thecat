#!/usr/bin/env node

'use strict';

var fs          = require('fs'),
    
    mime        = require('mime'),
    files       = require('files-io'),
    ponse       = require('ponse'),
    
    dir         = __dirname + '/../img/';


module.exports = function(options) {
    if (!options)
        options = {
            prefix : '/cat.png'
        };
    return middle.bind(null, options);
};

function middle(options, req, res, next) {
    var prefix      = options.prefix,
        pathName    = ponse.getPathName(req),
        regExp      = new RegExp('^' + prefix + '$'),
        is          = regExp.test(pathName);
    
    if (!is)
        next();
    else
        fs.readdir(dir, function(error, files) {
            var random, count, number, path, name, type,
                ONE_HOUR    = 3600;
            
            if (error)
                res.send(error);
            else {
                count       = files.length -1,
                random      = count * Math.random(),
                number      = Math.round(random),
                name        = files[number],
                path        = dir + name;
                type        = mime.lookup(path);
                
                res.contentType(type);
                res.setHeader('Cache-Control', 
                    'public, max-age=' + ONE_HOUR);
                
                sendFile(res, path);
            }
        });
}

function sendFile(res, name) {
    files.pipe(name, res, function(error) {
        if (error)
            res.send(error, 404);
    });
}

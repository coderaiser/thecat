'use strict';

const fs = require('fs');

const mime = require('mime');
const files = require('files-io');
const ponse = require('ponse');

const dir = __dirname + '/../img/';

module.exports = (options) => {
    if (!options)
        options = {
            prefix : '/cat.png'
        };
    
    return middle.bind(null, options);
};

function middle(options, req, res, next) {
    const prefix = options.prefix;
    const pathName = ponse.getPathName(req);
    const regExp = new RegExp('^' + prefix + '$');
    const is = regExp.test(pathName);
    
    if (!is)
        return next();
    
    fs.readdir(dir, function(error, files) {
        if (error)
            return res.send(error);
        
        const ONE_HOUR    = 3600;
        const count = files.length -1;
        const random = count * Math.random();
        const number = Math.round(random);
        const name = files[number];
        const path = dir + name;
        const type = mime.getType(path);
        
        res.contentType(type);
        res.setHeader('Cache-Control', 'public, max-age=' + ONE_HOUR);
        
        sendFile(res, path);
    });
}

function sendFile(res, name) {
    files.pipe(name, res, (error) => {
        if (error)
            res.send(error, 404);
    });
}


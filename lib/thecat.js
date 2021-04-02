'use strict';

const {readdir} = require('fs/promises');

const mime = require('mime');
const files = require('files-io');
const ponse = require('ponse');

const dir = __dirname + '/../img/';

module.exports = (options) => {
    if (!options)
        options = {
            prefix : '/cat.png',
        };
    
    return middle.bind(null, options);
};

function middle(options, req, res, next) {
    const {prefix} = options;
    const pathName = ponse.getPathName(req);
    const regExp = new RegExp('^' + prefix + '$');
    const is = regExp.test(pathName);
    
    if (!is)
        return next();
    
    send(res)
        .catch(next);
}

async function send(res) {
    const names = await readdir(dir);
    
    const ONE_HOUR = 3600;
    const count = names.length - 1;
    const random = count * Math.random();
    const number = Math.round(random);
    const name = names[number];
    const path = dir + name;
    const type = mime.getType(path);
    
    res.contentType(type);
    res.setHeader('Cache-Control', 'public, max-age=' + ONE_HOUR);
    
    await files.pipe(path, res);
}


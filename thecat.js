(function() {
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        mime        = require('mime'),
        fs          = require('fs'),
        utilIO      = require('util-io'),
        pipeIO      = require('pipe-io'),
        
        PORT        = 1234,
        dir         = './img/',
        app         = express();
    
    http.createServer(app).listen(PORT);
    
    console.log('server:' + PORT);
    
    app.get('/', function(req, res) {
        res.redirect('/cat.png');
    });
    
    app.get('/cat.png', function(req, res) {
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
                console.log(number, name);
            }
        });
    });
    
      function sendFile(res, name, callback) {
        pipeIO.create(name, res, function(error) {
            if (error)
                res.send(error, 404);
            else
                utilIO.exec(callback, name);
        });
    }
})();

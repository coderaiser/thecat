(function(){
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        mime        = require('mime'),
        fs          = require('fs'),
        
        PORT        = 1234,
        dir         = './img/',
        app         = express();
    
    http.createServer(app).listen(PORT);
    
    console.log('server: PORT');
    
    app.get('/', function(req, res) {
        res.redirect('/cat.png');
    });
    
    app.get('/cat.png', function(req, res) {
        fs.readdir(dir, function(error, files) {
            var random, count, number, path, name, type,
                ONE_MINUTE  = 3600;
            
            if (error)
                res.send(error);
            else {
                count   = files.length -1,
                random  = count * Math.random(),
                number  = Math.round(random),
                name    = files[number],
                path    = dir + name;
                type    = mime.lookup(path);
                
                res.contentType(type);
                res.setHeader('Cache-Control', 
                    'public, max-age=' + ONE_MINUTE);
                
                send(res, path);
                console.log(number, name);
            }
        });
    });
    
    function send(res, name, callback) {
        var read   = fs.createReadStream(name),
            error   = function (error) {
                res.send(error);
            },
            success = function () {
                if (typeof callback === 'function')
                    callback(name);
            };
        
        res.on('error', error);
        read.on('error', error);
        read.on('open', function() {
            read.pipe(res);
            read.on('end', success);
        });
    }
})()
(function(){
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
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
            var random, number, name;
        
            if (error)
                res.send(error);
            else {
                random  = Math.random() * files.length,
                number  = Math.round(random),
                name    = files[number];
                
                console.log(number, name);
                
                send(res, dir + name);
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
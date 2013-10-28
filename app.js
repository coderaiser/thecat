(function(){
    'use strict';
    
    var http        = require('http'),
        express     = require('express'),
        fs          = require('fs'),
        
        PORT        = 80,
        dir         = './img/',
        app         = express();

    http.createServer(app).listen(PORT);

    app.get('/', function(req, res) {
        res.redirect('/cat.png');
    });

    app.get('/cat.png', function(req, res) {
        fs.readdir(dir, function(error, files) {
            var random  = Math.random() * 10,
                number  = Math.round(random),
                name    = files && files[number];
            
            console.log(number, name);
            
            if (error)
                res.send(error);
            else
                send(res, dir + name);
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
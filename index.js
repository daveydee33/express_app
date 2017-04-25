var express = require('express');
var bodyParser = require('body-parser');    // for forms ?  Body Parser - Node.js body parsing middle ware.  https://github.com/expressjs/body-parser
var path = require('path');     // core module.  to simplify file paths.

var app = express();

// middleware example.
var logger = function(req, res, next) {
    console.log('Logging...');
    console.log(__dirname)
    next();
}

app.use(logger);



// using the Body Parser - middleware.  Look up this stuff in the documentation for body parser
app.use(bodyParser.json); // to parse JSON in HTTP body response
app.use(bodyParser.urlencoded({extended: false}));  // look this up in the documentation.

// Set static path
app.use(express.static(path.join(__dirname, 'public')));  // eg.  app.use(express.static('/blah/public'))

app.get('/', function(req, res){
    res.send('Received your GET request...\n')
})

app.post('/', function(req, res){
    res.send('Received your POST request...\n')
})

// Set the webserver to listen
app.listen(3000, function(){
    console.log('Example app listening on port 3000');
})
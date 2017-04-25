var express = require('express');
var bodyParser = require('body-parser');    // for forms ?  Body Parser - Node.js body parsing middle ware.  https://github.com/expressjs/body-parser
var path = require('path');     // core module.  to simplify file paths.

var app = express();

// middleware example.
var logger = function(req, res, next) {
    console.log('Logging...');
    next();
}

app.use(logger);


// Middleware - uusing the Body Parser.  Look up this stuff in the documentation for body parser
app.use(bodyParser.json()); // to parse JSON in HTTP body response
app.use(bodyParser.urlencoded({extended: false}));  // look this up in the documentation.

// Set static path
app.use(express.static(path.join(__dirname, 'public')));  // eg.  app.use(express.static('/blah/public'))
// this would end up serving (public/index.htm), since this comes before the later statement to serve "/" with something else.

// testing parsing JSON object to the browser.
var people = [
    {
        name: 'One',
        age: 1
    },
    {
        name: 'Two',
        age: 2
    },
    {
        name: 'Three',
        age: 3
    }
]


app.get('/', function(req, res){
    res.send('Received your GET request...\n')        // send raw text?
    //res.json(people);
})

app.post('/', function(req, res){
    res.send('Received your POST request...\n')
})

// Set the webserver to listen
app.listen(3000, function(){
    console.log('Example app listening on port 3000');
})
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

// View Engine - EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware - uusing the Body Parser.  Look up this stuff in the documentation for body parser
app.use(bodyParser.json()); // to parse JSON in HTTP body response
app.use(bodyParser.urlencoded({extended: false}));  // look this up in the documentation.

// Set static path
app.use(express.static(path.join(__dirname, 'public')));  // eg.  app.use(express.static('/blah/public'))
// this would end up serving (public/index.htm), since this comes before the later statement to serve "/" with something else.

// testing parsing JSON object to the browser.
var numbers = [
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
];

var userData = [
    {
        id: 1,
        first_name: 'Dave',
        last_name: 'Dee',
        email: 'test@test.com',
    },
    {
        id: 2,
        first_name: 'Zelda',
        last_name: 'Zee',
        email: 'z@test.com',
    },
]


app.get('/', function(req, res){
    //res.send('Received your GET request...\n')        // send raw text?
    //res.json(numbers); --> if we want to return JSON data.  Is this how APIs are made??
    
    // res.render('index');  // this will render index.ejs.
    res.render('index', { title: 'Blah!', users: userData })
})

app.post('/', function(req, res){
    res.send('Received your POST request...\n')
})

app.post('/users/add', function(req, res){
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    }
    console.log(newUser);
    res.send("Received input for: " + req.body.first_name);
})

// Set the webserver to listen
app.listen(3000, function(){
    console.log('Example app listening on port 3000');
})
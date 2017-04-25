var express = require('express');
var bodyParser = require('body-parser');    // for forms ?  Body Parser - Node.js body parsing middle ware.  https://github.com/expressjs/body-parser
var path = require('path');     // core module.  to simplify file paths.
var expressValidator = require('express-validator');  // To validate form data.  see: https://github.com/ctavan/express-validator
var mongojs = require('mongojs')

var db = mongojs('customerapp', ['users']); // need to replace 'customerapp' with a full connection string if elsewhere.  and 'users' is the colelction.  
// https://youtu.be/gnsO8-xJ8rs?t=57m7s
// https://github.com/mafintosh/mongojs

var app = express();

// middleware example.
var logger = function(req, res, next) {
    //console.log('Logging...');
    next();
}

// Middleware - just an example one.
app.use(logger);

// View Engine - EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware: bodyParser.  Look up this stuff in the documentation for body parser
app.use(bodyParser.json()); // to parse JSON in HTTP body response
app.use(bodyParser.urlencoded({extended: false}));  // look this up in the documentation.

// Set static path
app.use(express.static(path.join(__dirname, 'public')));  // eg.  app.use(express.static('/blah/public'))
// this would end up serving (public/index.htm), since this comes before the later statement to serve "/" with something else.

// Global Variables
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
})

// Middleware: express-validator.  https://github.com/ctavan/express-validator
//app.use(expressValidator([options])); // this line must be immediately after any of the bodyParser middlewares!
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


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

    // find everything (see other examples like sorting by name on MongoJS usage on GitHub page)
    db.users.find(function (err, docs) {
        // docs is an array of all the documents in mycollection
        console.log(docs)

        // res.render('index');  // this will render index.ejs.
        res.render('index', { 
            title: 'Blah!', 
            users: userData, // this was the sample data defined above in this file.  now replacing it with the data retrieved from MongoDB.
            users: docs
        })
    })
    

})

app.post('/', function(req, res){
    res.send('Received your POST request...\n')
})

app.post('/users/add', function(req, res){

    // express-validator Validation.  see: https://github.com/ctavan/express-validator#validation
    // The example in the youtube vid used req.checkBody, but i think req.assert is more complete?  https://youtu.be/gnsO8-xJ8rs?t=46m29s
    req.assert('first_name', 'First Name - is required').notEmpty();
    req.assert('last_name', 'Last Name - is required').notEmpty();
    req.assert('email', 'Email - is required').notEmpty();
    //req.checkBody('email', 'Email - valid email required').isEmail();

    // see: https://github.com/ctavan/express-validator#result-api
    // req.getValidationResult().then(function(result) {
    //     // do something with the validation result
    // });

    var errors = req.validationErrors();

    if (errors){
        console.log('ERRORS!');
        console.log(errors);
        // do something with the errors?
        // for now, re-render the page (same as the route for '/' above) and pass the errors to the template.
        res.render('index', { 
            title: 'Blah!', 
            users: userData,
            errors: errors, 
        })
    } else {
        console.log('SUCCESS!');
        // no errors - do something.
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        }
        console.log(newUser);
        
        // Now insert the user into MongoDB
        // eg, db.collection.insert(docOrDocs, [callback])   -- Said callback receives (err, documents)
        db.users.insert(newUser, function(err, result){
            if (err){
                console.log("Error---->");
                console.log(err);
                console.log("<--------")
            }

            // console.log(result); // this would end up being something like:
            // { first_name: 'iii',
            //   last_name: 'iii',
            //   email: 'iii',
            //   _id: 58ff1ffe60c259462a660c0d }

            res.redirect('/');
        })

        //res.send("Received input for: " + req.body.first_name);


    }


})

// Set the webserver to listen
app.listen(3000, function(){
    console.log('Example app listening on port 3000');
})
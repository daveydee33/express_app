My notes...

* [ExpressJS Crash Course (Traversy Media)](https://www.youtube.com/watch?v=gnsO8-xJ8rs&index=9&list=PLillGF-RfqbYeckUaD1z6nviTp31GLTH8)

# Install

* npm init
* npm install express --save
* npm install body-parser --save # to be able to grab form data ?

[Express body-parser](https://github.com/expressjs/body-parser)





We got the form done.
And we got validation working! 
Now i'm leaving off here - committing to git, and will start the MongoDB part next.


Next.
MongoDB
https://youtu.be/gnsO8-xJ8rs?t=51m22s




# MongoDB notes

To get started.

* mongo - start the CLI
* show dbs - show the databases.
* use customerapp - create a new db called 'customerapp' and switch to it.
* db.createCollection('users') - create's a collection called 'users.
* show collections -- to see all collections
* db.users.insert -- see below!
* db.users.find() -- to see all the data :)

Now we can start inserting data.

* db.users.insert.... -- see below.

```javascript
db.users.insert([
    {
    first_name:'aaa',
    last_name:'AAA',
    email:'aaa@test.com'
    },
    {
    first_name:'bbb',
    last_name:'BBB',
    email:'bbb@test.com'
    },
    {
    first_name:'ccc',
    last_name:'CCC',
    email:'ccc@test.com'
    }
])
```

```javascript
db.users.insert([{first_name:'aaa',last_name:'AAA',email:'aaa@test.com'}, {first_name:'bbb',last_name:'BBB',email:'bbb@test.com'}, {first_name:'ccc',last_name:'CCC',email:'ccc@test.com'}])
```



# Using MongoJS

Don't forget to install it.
`npm install mongojs --save`


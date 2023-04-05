# CRUD APPLICATION FOR ORDER MANAGEMENT SYSTEM

# Introduction
This project involves building a CRUD application that allows users to perform various operations related to order management. The application supports a number of endpoints that can be accessed by other systems or teams. 

The endpoints include functionalities such as creating a new order, retrieving an order by its unique ID, getting all the existing orders, deleting an order, and updating an existing order. This allows users to perform various operations on the orders that have been created. 

In order to ensure that the data is accurate and up-to-date, the application has a feature that prevents users from creating or updating orders if less than 3 hours have passed since any order was created in the database. This helps to maintain the integrity of the data and ensures that the order management system is working effectively.

# Getting Started
## Installation steps

We will first install a few dependencies:
```
npm i express mongoose nodemon dotenv
```
Here,

1.Express will be used for the middleware to create various CRUD endpoints.

2.Mongoose for managing data in MongoDB using various queries.

3.Nodemon to restart our server every time we save our file.

4.Dotenv to manage a .env file.

---
## Basic Setup
After they have finished installing, create one file named server.js. This will be the entry point for our application.

And in this file, let's add Express and Mongoose, and run the file.

```
const express = require('express');
const mongoose = require('mongoose');
```

Now, transfer the contents of Express into a new constant called app.

```
const express = require('express');
const mongoose = require('mongoose');

const app = express();
```
Now, let's listen the changes of this file on port 80.
```
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(80, () => {
    console.log(`Server Started at ${80}`)
})
```
## Connect mongodb in our application

After copying the string from MongoDb compass,

We will add our username and password to this string.
The final connecting string will look something like this:
```
'mongodb+srv://tusharagrawal2706:******@cluster0.bcfzcjv.mongodb.net/test_db'
```
Here, tusharagrawal2706 is the username, followed by the password, and last is the database name.

So, paste this string into the .env file.
```
DATABASE_URL = 
'mongodb+srv://tusharagrawal2706:******@cluster0.bcfzcjv.mongodb.net/test_db'
```

Now, let's import the contents of our .env file in the script file, server.js.
```
require('dotenv').config();


const mongoString = process.env.DATABASE_URL
```
Here, we are storing the string into a variable called mongoString.

Now, let's connect the database to our server using Mongoose.
```
mongoose.connect(mongoString);
const database = mongoose.connection
```
Now, we have to throw a success or an error message depending on whether our database connection is successful or fails.
```
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
```
Here, database.on means it will connect to the database, and throws any error if the connection fails. And database.once means it will run only one time. If it is successful, it will show a message that says Database Connected.

---

## Create our Routes for the Endpoints
Create a folder called routes, and inside make a file called route.js.

Import this file into our main script file, server.js.
```
const routes = require('./routes/route');
```
Also, let's use this routes file.
```
const routes = require('./routes/route');

app.use('/api', routes)
```
Here, this app.use takes two things. One is the base endpoint, and the other is the contents of the routes. Now, all our endpoints will start from '/api'.

We will get an error because we don't have anything inside the routes file. So, let's add them.
```
const express = require('express');

const router = express.Router()

module.exports = router;
```

# Working Of the project

The project works in a very simple way:

1.  We first create new orders using postman or through swagger by sending json objects in a body by performing POST request.

2. We can then send either of GET,PUT,POST,DELETE request in postman to handle the order data in db

3. For PUT and POST requests, I have added a middleware to check whether the most recently added order was more than 3 hours ago, then only PUT and POST controller function will perform the required operations of update and create.

#### Language used : JS

#### Frameworks used : Express.js , Jest

#### DB used : MongoDB

#### Documentation Library used: Swagger-UI

//lets first load out database config files.
require('dotenv').config();
//lets first start by creating the server so lets load https, http, and express
const http = require('http');
const https = require('https');
const express = require('express');
//now for local we will need to have ssl enabled, lets start with including filesystem and morgan to read files we'll need.  and logging.
const fs = require('fs');
const logger = require('morgan');

//set dbSettings using .env
const dbSettings = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        charset: 'utf8'
    }
};
//connect to db and use bookshelf.
const knex = require('knex')(dbSettings);
const bookshelf = require('bookshelf')(knex);
let options = {
    key: fs.readFileSync('./ssl/key.key'),
    cert: fs.readFileSync('./ssl/cert.crt'),
};
//lets initate express and set it to app
const app = new express();
app.set('bookshelf', bookshelf);
app.set('knex', knex);
const users = require('./Models/users')(app);
users.where('id', 4).fetch().then((user) => {
    if(!user) {
        console.log('Sorry Record Doesn\'t Exist');
    }   
}).catch((error)=>{
    console.log(error);
})

//now lets deal with middleware.
app.use(logger('dev'));

require('./router')(app);
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err,req, res, next) => {
    res.status(err.status || 500);
    err.message = err.message || "Internal Error";
    err.status = err.status || 500;
    res.send(`${err.status} ${err.message}`);
});



app.disable('etag');
//now lets deploy the server on 443

https.createServer(options, app).listen(443, () => {
    console.log('Server Spawned at: https://ar.bar/');
});
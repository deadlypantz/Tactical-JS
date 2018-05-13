//lets first load out database config files.
require('dotenv').config()
//lets first start by creating the server so lets load https, http, and express
const http = require('http')
const Koa = require('koa')
const Router = require('koa-router')
const Twig = require('twig')
const views = require('koa-views')
const mongoose = require('mongoose')
//now for local we will need to have ssl enabled, lets start with including filesystem and morgan to read files we'll need.  and logging.
const logger = require('koa-logger')
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
}
//connect to db and use objectionJS.
if(process.env.DB_TYPE != 'mongodb') {
    const knex = require('knex')(dbSettings)
    const { Model } = require('objection')
    Model.knex(knex)
} else {
    mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`) 
}


//lets initate express and set it to app
const app = new Koa()
//now lets deal with middleware.
app.use(require('koa-static')('public'))
app.use(views(__dirname + '/views', {extension: 'twig'}))
app.use(logger('dev'))
require('./router')(app)


app.listen(process.env.SERVER_PORT, () => {
    console.log("Server Started on Port " + process.env.SERVER_PORT)
})

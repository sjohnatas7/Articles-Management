const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db')

const mongoose = require('mongoose')
const mongodb = require('./config/mongodb')

app.db = db
app.mongoose = mongoose
consign()
    .include('./config/passport.js')
    .then('./config/middleawers.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)


app.listen(9000, ()=>console.log('Backend rodando'))

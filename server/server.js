//Libraries
const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressLayouts = require('express-ejs-layouts'),
    flash = require('express-flash'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    User = require("./models/User"),
    indexRouter = require('./routes/index'),
    userRouter = require('./routes/users'),
    initializePassport = require('./passport-config')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use('/', indexRouter)
app.use('/login', indexRouter)
app.use('/register', indexRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT, () => console.log("This server is running"))
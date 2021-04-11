const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const initializePassport = require('../passport-config')
const User = require("../models/User");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



//=======================
//      R O U T E S
//=======================

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {});

router.post("/register", (req, res) => {

    User.register(new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        address: req.body.address
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/login");
        })
    })
})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router
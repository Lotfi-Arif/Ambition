const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

// <<<<<<< docker-compose-docker-app
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true
// })
// const db = mongoose.connection
// db.on('error', error => console.error(e))
// db.once('open', () => console.log('Connected to Mongoose'))


// =======
// >>>>>>> main

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('index.ejs')
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            phoneNo: req.body.phoneNo
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
        alert("there may have been an error")
    }
    console.log(users)
})
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

module.exports = router
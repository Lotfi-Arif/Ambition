if (process.env.NODE_ENV) {
    require("dotenv").config({
        path: `${__dirname}/.env.${process.env.NODE_ENV}`,
    });
} else {
    require("dotenv").config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)



const users = []

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


// app.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.ejs', { name: req.user.username })
// })

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
// })

// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// })

// app.post('/register', checkNotAuthenticated, async(req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id: Date.now().toString(),
//             username: req.body.username,
//             fullname: req.body.fullname,
//             email: req.body.email,
//             password: hashedPassword,
//             address: req.body.address,
//             phoneNo: req.body.phoneNo
//         })
//         res.redirect('/login')
//     } catch {
//         res.redirect('/register')
//         alert("there may have been an error")
//     }
//     console.log(users)
// })
// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })

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

app.listen(process.env.PORT, () => console.log("This server is running"))
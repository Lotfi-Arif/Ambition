if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const inisializePassport = require('./passport-config')
inisializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index.ejs', { name: req.user.fullname })
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.psw, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            psw: hashedPassword,
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


app.listen(1337)
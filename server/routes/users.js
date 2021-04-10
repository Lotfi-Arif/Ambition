const express = require('express')
const router = express.Router()

//All users route
router.get('/', (req, res) => {
    res.render('Users/index')
})

//new user route
router.get('/new', (req, res) => {
    res.get('Users/new')
})

//create user route
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router
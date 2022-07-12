// Packages
const express = require('express')
const router = express.Router()
const Users = require('../models/users.js')
// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', (req, res) => {
  res.send('Hello from auth')
})

router.get('/login', (req, res) => {
  //res.send('Hello from login')
  res.render('login')
})

router.get('/singup', (req, res) => {
  res.render('signup')
})

router.post('/login', async (req, res) => {
  res.send('Hello from login')
})

router.post('/singup', async (req, res, next) => {
  //console.log(req.body)
  try {
    let foundUser = await Users.findOne({
      email: req.body.email
    })
    if (foundUser) {
      throw new Error('User with this email already exists')
    }
    res.redirect('/houses')
  })
})

router.get('/logout', (req, res) => {
  res.send('Hello from logout')
})

// Export
module.exports = router

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
  console.log(req.body)
  let user = await Users.create(req.body)
  req.login(user, err => {
    if (err) {
      throw err
    }
  })
})

router.get('/logout', (req, res) => {
  res.send('Hello from logout')
})

// Export
module.exports = router

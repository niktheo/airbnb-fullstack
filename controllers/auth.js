// Packages
const express = require('express')
const router = express.Router()
const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')
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

    //user.password = await bcrypt.hash(user.password)
    let salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body.password)

    let user = await Users.create(req.body)

    req.login(user, err => {
      if (err) {
        throw err
      }
      res.redirect('/houses')
    })
  } catch (err) {
    next(err)
  }
})

router.get('/logout', (req, res) => {
  res.send('Hello from logout')
})

// Export
module.exports = router

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

router.post('/login', async (req, res, next) => {
  try {
    let foundUser = await Users.findOne({
      email: req.body.email
      // password: req.body.password
    })
    // console.log(req.body)
    console.log('foundUser', foundUser)
    // if (
    //   (await Users.find({
    //     email: req.body.email
    //   })) &&
    //
    // ) {
    //   let foundUser = true
    // }
    if (!foundUser) {
      console.log('hello')
      throw new Error('Email and Password do not match')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.login(foundUser, err => {
          if (err) {
            throw err
          }
          res.redirect('/houses')
        })
      } else {
        throw new Error('Email and Password do not match')
      }
    }
  } catch (err) {
    next(err)
  }
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
  console.log('123')
  req.logout()
  req.session.destroy(err => {
    if (err) {
      next(err)
    }
    res.clearCookie('connect.sid')
    res.redirect('/auth/login')
  })
})

// Export
module.exports = router

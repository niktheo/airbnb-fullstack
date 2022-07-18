// Packages
const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Houses = require('../models/houses')
// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', async (req, res, next) => {
  if (req.isAuthenticated()) {
    let houses = await Houses.find({
      host: req.user._id
    })
    console.log(houses)
    res.render('profile', { user: req.user, houses })
  } else {
    res.redirect('/auth/login')
  }
})

router.patch('/', async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      let newuser = await Users.findByIdAndUpdate(req.user._id, req.body, {
        new: true
      })
      req.login(newuser, err => {
        if (err) {
          throw err
        } else {
          res.redirect('/profile')
        }
      })
    } else {
      res.redirect('/auth/login')
    }
  } catch (err) {
    next(err)
  }
})
// Export
module.exports = router

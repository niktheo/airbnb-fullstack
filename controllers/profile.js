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

router.patch('/', (req, res) => {
  if (req.isAuthenticated()) {
  } else {
    res.redirect('/auth/login')
  }
})

// Export
module.exports = router

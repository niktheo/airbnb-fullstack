// Packages
const express = require('express')
const router = express.Router()
const Houses = require('../models/houses.js')
// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', (req, res) => {
  res.render('houses/list', { user: req.user })
})

router.get('/create', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('houses/create', { user: req.user })
  } else {
    res.redirect('/auth/login')
  }
})

router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('houses/one', { user: req.user })
  } else {
    res.redirect('/auth/login')
  }
})

router.get('/:id/edit', (req, res) => {
  res.render('houses/edit', { user: req.user })
})

router.post('/', async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.body)
    req.body.host = req.user._id
    let house = await Houses.create(req.body)
    console.log(house._id)

    res.redirect(`/houses/${house._id}`)
  } else {
    res.redirect('/auth/login')
  }
})

router.patch('/:id', async (req, res) => {
  if (req.isAuthenticated()) {
  } else {
    res.redirect('/auth/login')
  }
})

router.delete('/:id', async (req, res) => {
  if (req.isAuthenticated()) {
  } else {
    res.redirect('/auth/login')
  }
})

// Export
module.exports = router

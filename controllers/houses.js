// Packages
const express = require('express')
const router = express.Router()
const Houses = require('../models/houses.js')
// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', async (req, res, next) => {
  try {
    //let houses = await Houses.find({})
    // console.log('req.query', req.query)
    // let houses = await Houses.find(req.query)
    res.render('houses/list', { user: req.user, houses })
  } catch (err) {
    next(err)
  }
})

router.get('/create', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('houses/create', { user: req.user })
  } else {
    res.redirect('/auth/login')
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let house = await Houses.findById(req.params.id).populate('host')
    console.log(house)
    res.render('houses/one', { user: req.user, house })
  } catch (err) {}
})

router.get('/:id/edit', (req, res) => {
  res.render('houses/edit', { user: req.user })
})

router.post('/', async (req, res, next) => {
  if (req.isAuthenticated()) {
    //console.log(req.body)
    req.body.host = req.user._id
    let house = await Houses.create(req.body)
    //console.log(house._id)
    //console.log(house)

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

// Packages
const express = require('express')
const router = express.Router()
const Houses = require('../models/houses.js')
// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', async (req, res, next) => {
  try {
    obj = {}
    if (req.query.location && req.query != undefined) {
      obj.location = req.query.location
    }
    if (req.query.rooms && req.query != undefined) {
      obj.rooms = req.query.rooms
    }
    if (req.query.price && req.query != undefined) {
      obj.price = {
        $lt: req.query.price
      }
    }
    if (req.query.title && req.query.title != undefined) {
      obj.title = { $regex: req.query.title, $options: 'i' }
    }
    let houses = []
    if (req.query.housesort != 0) {
      houses = await Houses.find(obj).sort('-price')
    } else {
      houses = await Houses.find(obj).sort('price')
    }

    console.log(obj)
    // console.log('req.query', req.query)
    // if (req.query.length == undefined) {
    //   console.log('hey')
    //   let houses = await Houses.find({})
    //   res.render('houses/list', { user: req.user, houses })
    // }
    // houses = await Houses.find({
    //   location: req.query.location
    // })
    // if (req.query.location == '') {
    //   let houses = await Houses.find({})
    //   res.render('houses/list', { user: req.user, houses })
    // }

    //console.log(houses)
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

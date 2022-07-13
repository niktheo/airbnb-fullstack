// Packages
const express = require('express')
const router = express.Router()

// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', (req, res) => {
  res.render('houses/list', { user: req.user })
  // res.send('Hello from houses')
})

router.get('/create', (req, res) => {
  res.render('houses/create', { user: req.user })
})

router.get('/:id', (req, res) => {
  res.render('houses/one', { user: req.user })
})

router.get('/:id/edit', (req, res) => {
  res.render('houses/edit', { user: req.user })
})

router.post('/', async (req, res) => {})

router.patch('/:id', async (req, res) => {})

router.delete('/:id', async (req, res) => {})

// Export
module.exports = router

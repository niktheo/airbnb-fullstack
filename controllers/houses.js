// Packages
const express = require('express')
const router = express.Router()

// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', (req, res) => {
  res.render('houses/list')
  // res.send('Hello from houses')
})

router.get('/create', (req, res) => {
  res.render('houses/create')
})

router.get('/:id', (req, res) => {
  res.render('houses/one')
})

router.get('/:id/edit', (req, res) => {
  res.render('houses/edit')
})

router.post('/', async (req, res) => {})

router.patch('/:id', async (req, res) => {})

router.delete('/:id', async (req, res) => {})

// Export
module.exports = router

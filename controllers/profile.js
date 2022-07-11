// Packages
const express = require('express')
const router = express.Router()

// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.get('/', (req, res) => {
  //res.send('Hello from profile')
  res.render('profile')
})

router.patch('/', (req, res) => {})

// Export
module.exports = router

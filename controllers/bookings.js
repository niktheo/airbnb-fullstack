// Packages
const express = require('express')
const router = express.Router()

// Views
// Create here a controller that accepts GET requests and renders the "search" page

router.post('/', async (req, res) => {
  res.send('Hello from signup')
})

// Export
module.exports = router

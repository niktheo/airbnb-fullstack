const mongoose = require('mongoose')

module.exports = mongoose.model('reviews', {
  author: {
    type: ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  house: {
    type: ObjectId,
    ref: 'houses',
    required: true
  },
  rating: {
    type: Number
  }
})

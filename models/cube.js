const mongoose = require('mongoose')

const CubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  imageUrl: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  accessories: [{
    type: 'ObjectId',
    ref: 'Accessory'
  }],
  creatorId: {
    type: 'ObjectId',
    ref: 'User'
  }
})

CubeSchema.path('imageUrl').validate(function(url) {
  return url.startsWith('http://') || url.startsWith('https://')
}, 'Image url is not valid')

module.exports = mongoose.model('Cube', CubeSchema)
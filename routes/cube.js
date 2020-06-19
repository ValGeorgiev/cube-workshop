const env = process.env.NODE_ENV || 'development'

const express = require('express')
const jwt = require('jsonwebtoken')
const Cube = require('../models/cube')
const { authAccess, getUserStatus } = require('../controllers/user')
const { getCubeWithAccessories } = require('../controllers/cubes')
const config = require('../config/config')[env]
const router = express.Router()

router.get('/edit', authAccess, getUserStatus, (req, res) => {
  res.render('editCubePage', {
    isLoggedIn: req.isLoggedIn
  })
})

router.get('/delete', authAccess, getUserStatus, (req, res) => {
  res.render('deleteCubePage', {
    isLoggedIn: req.isLoggedIn
  })
})

router.get('/details/:id', getUserStatus, async (req, res) => {

  const cube = await getCubeWithAccessories(req.params.id)
    
    
  res.render('details', {
    title: 'Details | Cube Workshop',
    ...cube,
    isLoggedIn: req.isLoggedIn
  })
})


router.get('/create', authAccess, getUserStatus, (req, res) => {
  res.render('create', {
    title: 'Create Cube | Cube Workshop',
    isLoggedIn: req.isLoggedIn
  })
})

router.post('/create', authAccess, async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    difficultyLevel
  } = req.body

  const token = req.cookies['aid']
  const decodedObject = jwt.verify(token, config.privateKey)

  const cube = new Cube({
    name: name.trim(),
    description: description.trim(),
    imageUrl,
    difficulty: difficultyLevel,
    creatorId: decodedObject.userID
  })

  try {
    await cube.save()
    return res.redirect('/')
  } catch (err) {
    return res.render('create', {
      title: 'Create Cube | Cube Workshop',
      isLoggedIn: req.isLoggedIn,
      error: 'Cube details are not valid'
    })
  }

})

module.exports = router
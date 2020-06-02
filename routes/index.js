const { Router } = require('express')
const { getAllCubes } = require('../controllers/cubes')
const { getCube } = require('../controllers/database')
const Cube = require('../models/cube')
const fs = require('fs')

const router = Router()

router.get('/', (req, res) => {
  getAllCubes((cubes) => {

    res.render('index', {
      title: 'Cube Workshop',
      cubes
    })
  })
})

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About | Cube Workshop'
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create Cube | Cube Workshop'
  })
})

router.post('/create', (req, res) => {
  const {
    name,
    description,
    imageUrl,
    difficultyLevel
  } = req.body

  const cube = new Cube(name, description, imageUrl, difficultyLevel)

  cube.save(() => {
    res.redirect('/')
  })
})

router.get('/details/:id', (req, res) => {

  getCube(req.params.id, (cube) => {
    res.render('details', {
      title: 'Details | Cube Workshop',
      ...cube
    })
  })
})

router.get('/delete/:id', (req, res) => {
  getAllCubes((cubes) => {
    const id = req.params.id;

    cubes.forEach((cube, i) => {
      if (cube.id === id) {
        cubes.splice(i, 1);
      }
    });

    fs.writeFile('./config/database.json', JSON.stringify(cubes), err => {
      if (err) {
        throw err;
      }
      console.log('The file has been deleted');
    })
    res.redirect(301, '/');
  })
})

router.get('*', (req, res) => {
  res.render('404', {
    title: 'Error | Cube Workshop'
  })
})

module.exports = router
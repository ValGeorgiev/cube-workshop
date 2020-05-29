const Cube = require('../models/cube')

const newCube = new Cube('Default', 'This is a default cube', 'https://google.com', 1)

console.log(newCube)

newCube.save()
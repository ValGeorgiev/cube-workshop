const Cube = require('../models/cube')

const getAllCubes = async () => {
  const cubes = await Cube.find().lean()
  return cubes
}

const getCube = async (id) => {
  const cube = await Cube.findById(id).lean()

  return cube
}


module.exports = {
  getAllCubes,
  getCube
}
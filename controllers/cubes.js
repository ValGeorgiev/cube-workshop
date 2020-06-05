const Cube = require('../models/cube')

const getAllCubes = async () => {
  const cubes = await Cube.find().lean()
  return cubes
}

const getCube = async (id) => {
  const cube = await Cube.findById(id).lean()

  return cube
}

const getCubeWithAccessories = async (id) => {
  const cube = await Cube.findById(id).populate('accessories').lean()
  console.log(cube)
  return cube
}

const updateCube = async (cubeId, accessoryId) => {

  await Cube.findByIdAndUpdate(cubeId, {
    $addToSet: {
      accessories: [accessoryId]
    }
  })
}


module.exports = {
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories
}
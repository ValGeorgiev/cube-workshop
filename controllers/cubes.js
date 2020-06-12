const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

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

  return cube
}

const updateCube = async (cubeId, accessoryId) => {
  try {
    await Cube.findByIdAndUpdate(cubeId, {
      $addToSet: {
        accessories: [accessoryId],
      },
    });
    await Accessory.findByIdAndUpdate(accessoryId, {
      $addToSet: {
        cubes: [cubeId],
      },
    })
  } catch (err) {
    return err
  }
}


module.exports = {
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories
}
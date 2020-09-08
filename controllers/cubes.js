const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

const getAllCubes = async () => {
  const cubes = await Cube.find();
  return cubes
}

const getCube = async (id) => {
  const cube = await Cube.findById(id);

  return cube
}

const getCubeWithAccessories = async (id) => {
  const cube = await Cube.findById(id).populate('accessories');

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
const Accessory = require('../models/accessory')
const Cube = require('../models/cube')

const getAccessories = async () => {
  const accessories = await Accessory.find();

  return accessories
}

const attachedAccessories = async (cubeId) => {
  try {
    const cube = await Cube.findById(cubeId);
    const accessories = await Accessory.find({ cubes: { $nin: cubeId } });
    return { cube, accessories }
  } catch (err) {
    return err
  }
}

module.exports = {
  getAccessories,
  attachedAccessories
}
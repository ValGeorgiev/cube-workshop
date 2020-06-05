const Accessory = require('../models/accessory')

const getAccessories = async () => {
  const accessories = await Accessory.find().lean()

  return accessories
}

module.exports = {
  getAccessories
}
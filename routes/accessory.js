const express = require('express')

const router = express.Router()


router.get('/create/accessory', (req, res) => {
  res.render('createAccessory', {
    title: 'Create accessory'
  })
})

router.post('/create/accessory', async (req, res) => {
  const {
    name,
    description,
    imageUrl
  } = req.body

  const accessory = new Accessory({
    name,
    description,
    imageUrl
  })

  await accessory.save()

  res.redirect('/create/accessory')
})

router.get('/attach/accessory/:id', async (req, res, next) => {
  const { id: cubeId } = req.params
  try {
    const data = await attachedAccessories(cubeId)

    res.render('attachAccessory', {
      title: 'Attach accessory',
      ...data,
    });
  } catch (err) {
    next(err)
  }
})

router.post('/attach/accessory/:id', async (req, res, next) => {
  const { accessory: accessoryId } = req.body
  const { id: cubeId} = req.params
  try {
    await updateCube(cubeId, accessoryId)
    res.redirect(`/details/${cubeId}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router
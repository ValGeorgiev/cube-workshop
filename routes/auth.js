const express = require('express')
const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user')

const router = express.Router()

router.get('/login', guestAccess, getUserStatus, (req, res) => {
  res.render('loginPage', {
    isLoggedIn: req.isLoggedIn
  })
})

router.get('/signup', guestAccess, getUserStatus, (req, res) => {
  res.render('registerPage', {
    isLoggedIn: req.isLoggedIn
  })
})

router.post('/signup', async (req, res) => {
  const status = await saveUser(req, res)
  
  if (status) {
    return res.redirect('/')
  }

  res.redirect('/')

})

router.post('/login', async (req, res) => {
  const status = await verifyUser(req, res)
  
  if (status) {
    return res.redirect('/')
  }

  res.redirect('/')

})


module.exports = router
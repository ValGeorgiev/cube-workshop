const env = process.env.NODE_ENV || 'development'

const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]
const bcrypt = require('bcrypt')
const User = require('../models/user')

const generateToken = data => {
  const token = jwt.sign(data, config.privateKey)

  return token
}

const saveUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  
  try {
    const user = new User({
      username,
      password: hashedPassword
    })
    
    const userObject = await user.save()
    
    const token = generateToken({ 
      userID: userObject._id,
      username: userObject.username
    })
    
    res.cookie('aid', token)
    
    return token
  } catch (err) {
    console.log(err)
    return {
      error: true,
      message: err
    }
  }
    
}

const verifyUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      console.log('no user')
      return {
        error: true,
        message: 'There is no such user'
      }
    }

    const status = await bcrypt.compare(password, user.password)
    console.log(status, 'status')
    if (status) {
      const token = generateToken({ 
        userID: user._id,
        username: user.username
      })
    
      res.cookie('aid', token)
    }
  
    return {
      error: !status,
      message: status || 'Wrong password'
    }
  } catch (err) {
    console.log('catch user')

    return {
      error: true,
      message: 'There is no such user',
      status
    }
  }

}

const authAccess = (req, res, next) => {
  const token = req.cookies['aid']
  if (!token) {
    return res.redirect('/')
  }
  
  try {
    jwt.verify(token, config.privateKey)
    next()
  } catch(e) {
    return res.redirect('/')
  }
}
const authAccessJSON = (req, res, next) => {
  const token = req.cookies['aid']
  if (!token) {
    return res.json({
      error: "Not authenticated"
    })
  }
  
  try {
    jwt.verify(token, config.privateKey)
    next()
  } catch(e) {
    return res.json({
      error: "Not authenticated"
    })
  }
}

const guestAccess = (req, res, next) => {
  const token = req.cookies['aid']
  if (token) {
    return res.redirect('/')
  }
  next()
}

const getUserStatus = (req, res, next) => {
  const token = req.cookies['aid']
  if (!token) {
    req.isLoggedIn = false
  }
  
  try {
    jwt.verify(token, config.privateKey)
    req.isLoggedIn = true
  } catch(e) {
    req.isLoggedIn = false
  }

  next()
}


module.exports = {
  saveUser,
  authAccess,
  verifyUser,
  guestAccess,
  getUserStatus,
  authAccessJSON
}
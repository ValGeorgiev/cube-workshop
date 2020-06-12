const handlebars = require('express-handlebars')
const express = require('express')
const cookieParser = require('cookie-parser')

module.exports = (app) => {
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.engine('.hbs', handlebars({
    extname: '.hbs'
  }))
  
  app.set('view engine', '.hbs');

  app.use('/static', express.static('static'))
};
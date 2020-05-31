const handlebars = require('express-handlebars')
const express = require('express')

module.exports = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.engine('.hbs', handlebars({
    extname: '.hbs'
  }))

  app.set('view engine', '.hbs');

  app.use(express.static('static'))
};
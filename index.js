require('dotenv').config()
const env = process.env.NODE_ENV

const mongoose = require('mongoose')
const config = require('./config/config')[env]
const express = require('express')
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const cubeRouter = require('./routes/cube')
const accessoryRouter = require('./routes/accessory')
const app = express()

let __setOptions = mongoose.Query.prototype.setOptions;

mongoose.Query.prototype.setOptions = function (options) {
    __setOptions.apply(this, arguments);
    if (this._mongooseOptions.lean == null) this._mongooseOptions.lean = true;
    return this;
};

mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.error(err)
    throw err
  }

  console.log('Database is setup and running')
})

require('./config/express')(app)

app.use('/', authRouter)
app.use('/', cubeRouter)
app.use('/', accessoryRouter)
app.use('/', indexRouter)

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error | Cube Workshop'
  })
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`))



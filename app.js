//imports
require('dotenv').config();
require('express-async-errors')



//create your app
const express = require('express');
const app = express();
const { sendEmail, resetEmail } = require('./controller/sendEmail')

//use the json middleware
app
  .use([express.urlencoded({ extended: false }), express.json()])
  .use('/', express.static('./public'))
  .use('/reset/:id', express.static('./form'))
//path for home that returns an <h1> with EMAIL PROJECT and an anchor with an href to /send
  .get('/', (req, res) => {
    res.send('<h1> EMAIL PROJECT </h1> <a href="/send"> Send Email </a>')
  })
//create /send a route with a GET method to run sendEmail (controller)
  .get('/send', sendEmail)
  .get('/reset', resetEmail)
//create your port variable
const port = process.env.PORT || 3000

//create your app startup function
const start = () => {
  try{
    app.listen(port, console.log(`listeing @ ${port}`))
  } catch (err) {
    console.error(err);
  }
}

//run the app startup function\
start();
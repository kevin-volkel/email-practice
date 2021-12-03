//create a function returning a json with success
require('dotenv').config()
const nodemailer = require('nodemailer')
let alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'


const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'laisha.stehr4@ethereal.email',
      pass: process.env.MAILERPASS
      }
  });
  
  let info = await transporter.sendMail({
    to: 'kevinator900@gmail.com',
    from: 'Joe Biden',
    replyTo: 'something@else.idc',
    subject: 'NodeMailer Test',
    html: '<h1> This isn\'t Google </h1><p> test <em> nodemailer </em> here </p> '
  })

  res.json(info)
}

const resetEmail = async (req, res) => {
  let randCode = [];
  for(let i = 0; i < 10; i++){
    let randy = Math.floor(Math.random() * alphabet.length - 1)
    randCode.push(alphabet[randy])
  }
  randCode = randCode.join('')
  console.log(randCode);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'laisha.stehr4@ethereal.email',
      pass: process.env.MAILERPASS
    }
  });
  
  let info = await transporter.sendMail({
    to: 'kevinator900@gmail.com',
    from: 'noreply',
    replyTo: 'something@else.idc',
    subject: 'Reset Password',
    html: `<h1> Here is your reset code </h1><p> Code: <em> ${randCode} </em> or click <a href="localhost:3000/reset/${randCode}/">here</a></p>`
  })
  res.json({info})
} 

module.exports = {sendEmail, resetEmail};
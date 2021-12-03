const jwt = require('jsonwebtoken')
const { UnauthError } = require('../errors')
require('dotenv').config()


const authMiddleware = async (req, res, next) => {
  //! check the header
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthError('Not authorized to access this route')
  }

  const token = authHeader.split(' ')[1]
  console.log(token);

  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userID: payload.userID, name: payload.name}
    next()
  } catch (err) {
    throw new UnauthError('Authorization Invalid')
  }
}

module.exports = authMiddleware;
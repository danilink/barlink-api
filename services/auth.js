'use strict'

//const jwt = require('jwt-simple')
var jwt = require('jsonwebtoken');
const moment = require('moment')
const config = require('../config')

function createToken (user) {

  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  let token = ''
  try {
    token = jwt.sign(payload, config.auth.secret)
  } catch (e) {
    return next(e)
  }

  return token
}

async function decodeToken (token) {
 let decoded = ''
  try {
      decoded = await jwt.verify(token, config.auth.secret)
    } catch (e) {
      return next(e)
    }

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}

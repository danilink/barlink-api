'use strict'

//const jwt = require('jwt-simple')
var jwt = require('jsonwebtoken');
const moment = require('moment')
const config = require('../config')

async function createToken (user) {

  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  let token = ''
  try {
    token = await jwt.sign(payload, config.auth.secret)
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

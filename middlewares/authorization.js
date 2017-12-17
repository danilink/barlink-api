'use strict'

const {
  NotAuthorizedError,
  NotAdminError
} = require('../handlers/custom-errors')
const services = require('../services/auth')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}
// Check if the user is admin through token authorization
function isAdmin (req, res, next) {
  if (!req.user.admin) {
    return next(new NotAdminError(req.user.username))
  }
  next()
}

module.exports = {
  isAuth,
  isAdmin
}

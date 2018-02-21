'use strict'

const User = require('../models/user')
const service = require('../services/auth')
const bcrypt = require('bcrypt')

async function register(req, res) {
  const newUser = new User(req.body);
  newUser.secretpwd = bcrypt.hashSync(req.body.password, 10);
  try {
    let user = await User.create(newUser)
    return res.status(200).send({token: service.createToken(user)})

  } catch (error) {
    return res.status(500).send({message: `Error al crear el usuario ${err}`});
  }
}

async function login (req, res) {
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(404).send({ message: 'No existe el usuario' })
    if (!user.comparePassword(req.body.password)) return res.status(401).send({ message: 'Credenciales incorrectas' })

    req.user = user
    res.status(200).send({
        message: 'Usuario logado correctamente',
        token: await service.createToken(user)
      })

  } catch (error) {
    return res.status(500).send({ message: err })
  }
  
}

module.exports = {
  register,
  login
}

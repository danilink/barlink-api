'use strict'

const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user')
const service = require('../services/auth')

async function register(req, res) {
  const newUser = new User(req.body);
  newUser.secretpwd = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err) => {
    if (err) {
      return res.status(500).send({message: `Error al crear el usuario ${err}`});
    }
    return res.status(200).send({token: service.createToken(newUser)})
  });
};

function signIn (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      message: 'Usuario logado correctamente',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  register,
  signIn
}

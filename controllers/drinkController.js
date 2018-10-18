'use strict'

const Drink = require('../models/drink')
const moment = require('moment')
const User = require('../models/user')

async function create(req, res) {
  console.log('POST /api/drink')
  console.log(req.body)
  console.log(req.user)

  let drink = new Drink()
  drink.name = req.body.name
  drink.price  = req.body.price
  drink.description = req.body.description
  drink._user  = new User({_id:req.user.sub})
  drink.category = req.body.category

  drink.save((err, drinkStored) => {
    if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ drink: drinkStored })
  })
};

async function fetchAll (req, res) {
  Drink.find({}, (err, drinkList) => {
    if (err) return res.status(500).send({message: `Error al recuperar de la base de datos: ${err} `})

    res.status(200).send({ drinkList: drinkList })
  })
}

async function detail(req, res) {
  console.log('POST /api/drink/{id}')
  console.log(req.body)
  let drinkId = req.params.id

  Drink.findById(drinkId, (err, drinkFound) => {
    if (err) res.status(500).send({message: `Error al recuperar de la base de datos: ${err} `})
    res.status(200).send({ drink: drinkFound })
  })
};

module.exports = {
  create,
  fetchAll,
  detail
}

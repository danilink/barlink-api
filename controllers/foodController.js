'use strict'

const Food = require('../models/food')
const moment = require('moment')
const User = require('../models/user')

async function create(req, res) {
  console.log('POST /api/food')
  console.log(req.body)
  console.log(req.user)

  let food = new Food()
  food.name = req.body.name
  food.price  = req.body.price
  food._user  = new User({_id:req.user.sub})
  food.category = req.body.category

  food.save((err, foodStored) => {
    if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ food: foodStored })
  })
};

async function fetchAll (req, res) {
  Food.find({}, (err, foodList) => {
    if (err) return res.status(500).send({message: `Error al recuperar de la base de datos: ${err} `})

    res.status(200).send({ foodList: foodList })
  })
}

async function detail(req, res) {
  console.log('POST /api/food/{id}')
  console.log(req.body)
  let foodId = req.params.id

  Expense.findById(foodId, (err, foodFound) => {
    if (err) res.status(500).send({message: `Error al recuperar de la base de datos: ${err} `})
    res.status(200).send({ food: foodFound })
  })
};

module.exports = {
  create,
  fetchAll,
  detail
}

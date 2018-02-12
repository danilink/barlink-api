'use strict'

const Income = require('../models/income')
const moment = require('moment')

async function create(req, res) {
  console.log('POST /api/income')
  console.log(req.body)

  let income = new Income()
  income.value = req.body.value
  income.date  = new Date(req.body.date)
  income.user  = req.body.user
  income.description = req.body.description

  income.save((err, incomeStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ income: incomeStored })
  })
};

function fetchAll (req, res) {
  Income.find({}, (err, incomeList) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ incomeList: incomeList })
  })
}

async function detail(req, res) {
  console.log('POST /api/{id}')
  console.log(req.body)
  let income = new Income()
  let incomeid = req.params.id

  Income.findById(incomeid, (err, incomeFound) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
    res.status(200).send({ income: incomeFound })
  })
};

module.exports = {
  create,
  fetchAll,
  detail
}

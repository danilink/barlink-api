'use strict'

const Expense = require('../models/expense')
const moment = require('moment')

async function create(req, res) {
  console.log('POST /api/expense')
  console.log(req.body)

  let expense = new Expense()
  expense.price = req.body.price
  expense.date  = new Date(req.body.date)
  expense.user  = req.body.user
  expense.description = req.body.description

  expense.save((err, expenseStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ expense: expenseStored })
  })
};

function fetchAll (req, res) {
  Expense.find({}, (err, expensesList) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ expensesList: expensesList })
  })
}

async function detail(req, res) {
  console.log('POST /api/{id}')
  console.log(req.body)
  let expense = new Expense()
  let expenseid = req.params.id

  Expense.findById(expenseid, (err, expenseFound) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
    res.status(200).send({ expense: expenseFound })
  })
};

module.exports = {
  create,
  fetchAll,
  detail
}

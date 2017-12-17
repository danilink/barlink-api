'use strict'

const Expense = require('../models/expense')
const moment = require('moment')

async function create(req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let expense = new Expense()
  expense.price = req.body.price
  expense.date  = new Date(req.body.date)
  expense.description = req.body.description

  expense.save((err, expenseStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ expense: expenseStored })
  })
};

function fetchAll (req, res) {
  console.log(req.body);
}

module.exports = {
  create,
  fetchAll
}

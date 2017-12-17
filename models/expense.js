'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'userSchema'
  }
})

module.exports = mongoose.model('Expense', expenseSchema)

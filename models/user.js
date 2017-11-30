'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  surname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true
  },
  secretpwd: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true
  }
})

userSchema.methods.comparePassword = function(pwd) {
  return bcrypt.compareSync(pwd, secretpwd)
}

module.exports = mongoose.model('User', userSchema)

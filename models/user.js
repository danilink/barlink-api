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
    required: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  secretpwd: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
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
  return bcrypt.compareSync(pwd, this.secretpwd)
}

module.exports = mongoose.model('User', userSchema)

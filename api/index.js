'use strict'

const express = require('express')
const jwt = require('express-jwt')
const guard = require('express-jwt-permissions')()
const bodyParser = require('body-parser')
const asyncify = require('express-asyncify')

const movies = require('./movies')
const auth = require('./auth')

const config = { secret: process.env.SECRET || 'apirestaurant' }
const api = asyncify(express.Router())

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

// API Routes
api.post('/auth', auth.generateToken)
api.get('/auth/:token', auth.decodeToken)

api.get('/movies', jwt(config), movies.fetchAll)
api.get('/movie/:id', jwt(config), movies.fetchById)
api.post('/movie', jwt(config), guard.check(['movies:write']), movies.save)
api.delete('/movie/:id', jwt(config), movies.remove)

module.exports = api

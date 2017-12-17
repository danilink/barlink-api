'use strict'

const express = require('express')
const jwt = require('express-jwt')
const guard = require('express-jwt-permissions')()
const bodyParser = require('body-parser')
const asyncify = require('express-asyncify')

const userCtrl = require('../controllers/user')
const expenseCtrl = require('../controllers/expense')

const config = require('../config')
const api = asyncify(express.Router())

const { isAdmin, isAuthorized } = require('../middlewares/authorization')

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

// API Routes
api.post('/signup', userCtrl.register)
api.post('/signin', userCtrl.signIn)

/*api.get('/movies', jwt(config.auth), movies.fetchAll)
api.get('/movie/:id', jwt(config.auth), movies.fetchById)*/
api.post('/expense', expenseCtrl.create)
//api.delete('/movie/:id', jwt(config.auth), movies.remove)

module.exports = api

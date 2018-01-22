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

const { isAdmin, isAuth} = require('../middlewares/authorization')

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

// API Routes
api.post('/signin', userCtrl.register)
api.post('/login', userCtrl.login)

/*api.get('/movies', jwt(config.auth), movies.fetchAll)
api.get('/movie/:id', jwt(config.auth), movies.fetchById)*/
api.post('/expense', jwt(config.auth), isAuth, expenseCtrl.create)
api.get('/expense/:id', expenseCtrl.detail)
api.get('/expense', expenseCtrl.fetchAll)
//api.delete('/movie/:id', jwt(config.auth), movies.remove)

module.exports = api

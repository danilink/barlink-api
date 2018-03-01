'use strict'

const jwt = require('express-jwt')
const guard = require('express-jwt-permissions')()
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')

const userCtrl = require('../controllers/userController')
const expenseCtrl = require('../controllers/expenseController')
const incomeCtrl = require('../controllers/incomeController')

const config = require('../config')
const api = asyncify(express.Router())


const { isAdmin, isAuth} = require('../middlewares/authorization')

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

//enabled cors
api.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// API Routes
api.post('/signin', userCtrl.register)
api.post('/login', userCtrl.login)

api.post('/expenses', jwt(config.auth), isAuth, expenseCtrl.create)
api.get('/expenses/:id', expenseCtrl.detail)
api.get('/expenses', expenseCtrl.fetchAll)

api.post('/incomes', jwt(config.auth), isAuth, incomeCtrl.create)
api.get('/incomes', jwt(config.auth), isAuth, incomeCtrl.fetchAll)

module.exports = api

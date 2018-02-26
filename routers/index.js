'use strict'

const jwt = require('express-jwt')
const guard = require('express-jwt-permissions')()
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')

const userCtrl = require('../controllers/user')
const expenseCtrl = require('../controllers/expense')
const incomeCtrl = require('../controllers/income')

const config = require('../config')
const api = asyncify(express.Router())

const argv = require('minimist')(process.argv.slice(2));
const subpath = asyncify(express.Router())

var swagger = require('swagger-node-express').createNew(subpath);

api.use(express.static('dist'));

swagger.setApiInfo({
	    title: "example API",
	    description: "API to do something, manage something...",
	    termsOfServiceUrl: "",
	    contact: "yourname@something.com",
	    license: "",
	    licenseUrl: ""
	});


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

/*api.get('/movies', jwt(config.auth), movies.fetchAll)
api.get('/movie/:id', jwt(config.auth), movies.fetchById)*/
api.post('/expense', jwt(config.auth), isAuth, expenseCtrl.create)
api.get('/expense/:id', expenseCtrl.detail)
api.get('/expenses', expenseCtrl.fetchAll)

api.post('/income', jwt(config.auth), isAuth, incomeCtrl.create)
//api.delete('/movie/:id', jwt(config.auth), movies.remove)

module.exports = api

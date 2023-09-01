// src/routes/v1.js
const express = require('express');
const v1Router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const {_, auth, refresh} = require('../middleware/VerifyToken');


// user
v1Router.get('/users', auth, UserController.getAllUsers);
v1Router.get('/users/:id', auth, UserController.getUserById);
v1Router.post('/users', auth, UserController.createUser);
v1Router.put('/users/:id', auth, UserController.updateUser);
v1Router.delete('/users/:id', auth, UserController.deleteUser);

// auth
v1Router.post('/auth/register', auth, AuthController.register);
v1Router.post('/auth/refresh-token', refresh, AuthController.refreshToken);


v1Router.post('/auth/login', AuthController.login);

module.exports = v1Router;

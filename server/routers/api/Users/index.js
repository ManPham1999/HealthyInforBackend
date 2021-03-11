const express = require('express');
const router = express.Router();
const ValidateLogin = require('../../../validations/ValidateLogin');
const userController = require('./user');
//Routers
router.post('/login', userController.Login);
router.post('/request', userController.Request);
router.post('/accept', userController.Accept);
router.post('/reject', userController.Reject);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserByID);
router.post('/addReport/:id', userController.insertReport);
router.put('/updateHeight&Weight/:id', userController.UpdateUserHeightAndWeight);
module.exports = router;

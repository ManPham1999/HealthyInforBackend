const express = require('express');
const router = express.Router();
const ValidateLogin = require('../../../validations/ValidateLogin');
const reportController = require('./report');
//Routers
router.post('/getAllReport', reportController.getAllReport);
module.exports = router;

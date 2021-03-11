// 3rd packages
var jwt = require('jsonwebtoken');

// load model
const {Student} = require('../../../models/student.model');
const {Club} = require('../../../models/club.model');

// 3rd packages
const bcrypt = require('bcryptjs');
var validator = require('validator');
const dateFormat = require('dateformat');

const getAllReport = (req, res) => {};

module.exports = {
	getAllReport,
};

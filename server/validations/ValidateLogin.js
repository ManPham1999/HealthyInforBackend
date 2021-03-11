const {User} = require('../models/user.model');

const ValidateLogin = async (req, res, next) => {
	console.log(req.body);
	const {userName, passWord} = req.body;
	if (userName !== '' && passWord !== '') {
		let result = await User.find({userName, passWord});
		if (result) {
			return next();
		}
		return res.status(403).json({errors: 'user name or password are wrong'});
	} else {
		return res.status(403).json({errors: 'user name and password are empty'});
	}
};
module.exports = {
	ValidateLogin,
};

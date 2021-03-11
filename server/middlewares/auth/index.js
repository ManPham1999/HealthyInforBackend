// 3rd packages
const jwt = require('jsonwebtoken');
const {jwtKey} = require('../../Keys');
//xác thực
// route   POST  /api/users/test-private
// desc    test-private
// access  PRIVATE (Chỉ cho những user đã loginn vào hệ thống mới sài được)
const authenticating = (req, res, next) => {
	// verify token
	// thanhcong : return next()
	// thatbai: res.json(err)
	const token = req.header('Authorization');
	try {
		const decoded = jwt.verify(token, jwtKey);
		console.log(decoded);
		next();
	} catch (error) {
		res.status(403).json({
			errors: "Can't not access, your token or fingerprint is invalid !",
		});
	}
};
//phân quyền
// user : admin, club owner
const authorizing = (userTypeArray) => {
	return (req, res, next) => {
		const {userType} = req.user.payload;
		//userTypeArray : danh sach user co the dang nhap
		// userType lay tu token
		// Neu userTypeArray co chua userType minh muon thi tra ve next cho di tiep ko thi res
		if (userTypeArray.indexOf(userType) > -1) {
			return next();
		} else {
			res.status(403).json({errors: "Your don't have permition to access !"});
		}
	};
};

module.exports = {
	authenticating,
	authorizing,
};

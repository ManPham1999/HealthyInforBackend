// 3rd packages
const mongoose = require('mongoose');

// Schema model
const friendSchema = new mongoose.Schema({
	requester: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	status: {
		type: Number,
		enums: [
			0, //'add friend',
			1, //'requested',
			2, //'pending',
			3, //'friends'
		],
	},
});

const Friend = mongoose.model('Friend', friendSchema);

// Export module
module.exports = {
	friendSchema,
	Friend,
};

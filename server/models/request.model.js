// 3rd packages
const mongoose = require('mongoose');

// Schema model

const RequestSchema = new mongoose.Schema({
	requester: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	status: {
		type: Number,
		enums: [
			0, //'challenge',
			1, //'challenge requested',
			2, //'pending',
			3, //'challenge accepted'
		],
	},
});

const Request = mongoose.model('Request', RequestSchema);

// Export module
module.exports = {
	RequestSchema,
	Request,
};

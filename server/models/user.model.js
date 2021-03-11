// 3rd packages
const mongoose = require('mongoose');

// Schema model
const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	height: {
		type: Number,
	},
	weight: {
		type: Number,
	},
	email: {
		type: String,
		required: true,
	},
	reports: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Report',
		},
	],
	friendlist: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Friend',
		},
	],
	requestlist: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Request',
		},
	],
	gender: {
		type: Boolean,
		default: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
});

const User = mongoose.model('User', UserSchema);

// Export module
module.exports = {
	UserSchema,
	User,
};

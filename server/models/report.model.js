// 3rd packages
const mongoose = require('mongoose');

// Schema model
const ReportSchema = new mongoose.Schema({
	speedavg: {
		type: Number,
		required: true,
	},
	calories: {
		type: Number,
		required: true,
	},
	distance: {
		type: Number,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
	registerDate: {
		type: String,
		default: new Date().toLocaleString(),
	},
});

const Report = mongoose.model('Report', ReportSchema);
// Export module
module.exports = {
	ReportSchema,
	Report,
};

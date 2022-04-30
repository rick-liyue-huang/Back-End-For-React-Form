
const mongoose = require('mongoose');
const {Schema} = mongoose;

const employeeSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	}
});


// create employees collection in db
module.exports = mongoose.model('Employee', employeeSchema);

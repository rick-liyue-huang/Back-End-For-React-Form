
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	roles: {
		User: {
			type: Number,
			default: 1000
		},
		Editor: {
			type: Number,
		},
		Admin: {
			type: Number
		}
	},
	password: {
		type: String,
		required: true
	},
	refreshToken: {
		type: String
	}
});

// create users collection in db
module.exports = mongoose.model('User', userSchema);



const {allowedOrigins} = require("./allowedOrigins");

// config the cors
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			// no error and send yes
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200
};


module.exports = {corsOptions}

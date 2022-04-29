
const whiteList = [
	'https://www.yoursite.com',
	'http://127.0.0.1:5500',
	'http://localhost:3500',
	'http://localhost:3000',
];

// config the cors
const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			// no error and send yes
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200
};


module.exports = {corsOptions}


const express = require('express');
const path = require('path');
const cors = require('cors');
const {logger} = require("./middlewares/logger");
const {errorHandler} = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3500;

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

const app = express();

/**
 * BuiltIn middleware to handle urlencoded data
 * in other words, form data
 * 'content-type': 'application/x-www-form-urlencoded'
 */
app.use(express.urlencoded({extended: false}));

/**
 * BuiltIn middleware for json
 */
app.use(express.json());

/**
 * serve static files
 */
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')))

/**
 * custom middleware logger
 */
app.use(logger);

/**
 * solve the problem of Cross Origin Resource Sharing
 */
app.use(cors(corsOptions));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.get('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	}
	else if (req.accepts('json')) {
		res.json({error: '404 Not found'})
	}
	else {
		res.type('txt').send('404 Not found');
	}
});


app.use(errorHandler);


app.listen(PORT, () => console.log(`this server is running on port of ${PORT}`));



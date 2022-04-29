
const express = require('express');
const path = require('path');
const cors = require('cors');
const {logger} = require("./middlewares/logger");
const {errorHandler} = require("./middlewares/errorHandler");
const {corsOptions} = require("./configs/corsOptions");
const PORT = process.env.PORT || 3500;


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


/**
 * custom middleware logger
 */
app.use(logger);

/**
 * solve the problem of Cross Origin Resource Sharing
 */
app.use(cors(corsOptions));

// config routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

app.get('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', 'public', '404.html'))
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



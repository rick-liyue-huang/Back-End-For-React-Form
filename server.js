require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const {logger} = require("./middlewares/logger");
const {errorHandler} = require("./middlewares/errorHandler");
const {corsOptions} = require("./configs/corsOptions");
const {jwtVerifyHandler} = require("./middlewares/jwtVerifyHandler");
const cookieParser = require('cookie-parser');
const {credentials} = require("./middlewares/credentials");
const mongoose = require('mongoose');
const {connectDB} = require('./configs/dbConn')
const PORT = process.env.PORT || 3500;

// connect db
connectDB();


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
 * cookie-parser
 */
app.use(cookieParser());

/**
 * serve static files
 */
app.use('/', express.static(path.join(__dirname, '/public')));


/**
 * custom middleware logger
 */
app.use(logger);

/**
 * handle options credentials check - before CORS
 * and fetch cookies credentials requirement
 */
app.use(credentials);

/**
 * solve the problem of Cross Origin Resource Sharing
 */
app.use(cors(corsOptions));

// config routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'))

app.use(jwtVerifyHandler); // will works on the following routes
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

mongoose.connection.once('open', () => {
	console.log('Connect with MongoDB');
	app.listen(PORT, () => console.log(`this server is running on port of ${PORT}`));
})





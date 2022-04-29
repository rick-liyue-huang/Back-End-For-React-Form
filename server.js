
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
app.use(express.static(path.join(__dirname, '/public')));

/**
 * custom middleware logger
 */
app.use(logger);

/**
 * solve the problem of Cross Origin Resource Sharing
 */
app.use(cors(corsOptions));

// set path name
app.get('^/$|/index(.html)?', (req, res) => {
	// res.sendFile('./views/public/index.html', {root: __dirname})
	res.sendFile(path.join(__dirname, 'views', 'public', 'index.html'));
});

app.get('/new-page.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'views'));
});

app.get('/old-page.html', (req, res) => {
	res.redirect(301,'/new-page.html'); // 302 by default
})

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
	console.log('attempt to load hello.html')
	next()
}, (req, res) => {
	res.send('hello world');
});

const one = (req, res, next) => {
	console.log('one')
	next();
}

const two = (req, res, next) => {
	console.log('two')
	next();
}

const three = (req, res, next) => {
	console.log('three');
	res.send('finished');
}

app.get('/three',[ one, two, three]);



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



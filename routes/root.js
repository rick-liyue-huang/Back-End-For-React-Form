
const express = require('express');
const router = express.Router();
const path = require('path')

// set path name
router.get('^/$|/index(.html)?', (req, res) => {
	// res.sendFile('./views/public/index.html', {root: __dirname})
	res.sendFile(path.join(__dirname, '..', 'views', 'public', 'index.html'));
});

router.get('/new-page.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', '..'));
});

router.get('/old-page.html', (req, res) => {
	res.redirect(301,'/new-page.html'); // 302 by default
});

module.exports = router;

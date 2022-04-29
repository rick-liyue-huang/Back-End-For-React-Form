
const express = require('express');
const router = express.Router();
const path = require('path')

// set path name
router.get('^/$|/index(.html)?', (req, res) => {
	// res.sendFile('./views/public/index.html', {root: __dirname})
	res.sendFile(path.join(__dirname, '..', 'views', 'public', 'index.html'));
});

// router.get('/old-page.html', (req, res) => {
// 	res.redirect(301,'/'); // 302 by default
// });

module.exports = router;

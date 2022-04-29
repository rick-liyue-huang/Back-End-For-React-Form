
const express = require('express');
const router = express.Router();
const path = require('path')

// set path name
router.get('^/$|/index(.html)?', (req, res) => {
	// res.sendFile('./views/public/index.html', {root: __dirname})
	res.sendFile(path.join(__dirname, '..', 'views', 'public', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'public', 'subdir', 'test.html'))
})

module.exports = router;

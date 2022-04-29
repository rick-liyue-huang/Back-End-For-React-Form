
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;

const app = express();

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.listen(PORT, () => console.log(`this server is running on port of ${PORT}`));



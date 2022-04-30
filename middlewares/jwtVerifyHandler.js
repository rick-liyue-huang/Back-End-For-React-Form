
const jwt = require('jsonwebtoken');
require('dotenv').config();

// accessToken store as headers['authorization']
const jwtVerifyHandler = (req, res, next) => {
	// const authHeader = req.headers['authorization'];
	const authHeader = req.headers.authorization || req.headers.Authorization

	if (!authHeader?.startsWith('Bearer')) {
		return res.status(401).json({message: 'UnAuthorization, no token'})
	}
	console.log(authHeader); // Bearer token

	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
		if (err) {
			return res.sendStatus(403); // forbidden, invalid token
		}
		// add user property on req, decode is the payload on jwt.sign()
		req.user = decode.UserInfo.username;
		req.roles = decode.UserInfo.roles
		next();
	});
}

module.exports = {jwtVerifyHandler};

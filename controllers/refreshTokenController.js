

const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {this.users = data}
};


const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}
	console.log(cookies.jwt);

	const refreshToken = cookies.jwt;

	const foundUser = usersDB.users.find(u => u.refreshToken === refreshToken);

	if (!foundUser) {
		return res.status(403).json({'message': 'Unauthorized, not yet registered'})
	}

//	evaluate jwt
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decode) => {
			if (err || foundUser.username !== decode.username) {
				return res.sendStatus(403)
			}

			// get back accessToken from refreshToken
			const accessToken = jwt.sign(
				{'username': decode.username},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '30s'}
			);
			res.json({accessToken})
		}
	)
};

module.exports = {handleRefreshToken}

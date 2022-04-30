
/*
const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {this.users = data}
};
*/

const User = require('../model/User');

const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}
	console.log(cookies.jwt);

	const refreshToken = cookies.jwt;

	// const foundUser = usersDB.users.find(u => u.refreshToken === refreshToken);
	const foundUser = await User.findOne({refreshToken}).exec();

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

			const roles = Object.values(foundUser.roles);

			// get back accessToken from refreshToken
			const accessToken = jwt.sign(
				{'UserInfo': {
							'username': decode.username,
							'roles': roles
						}
					},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '300s'}
			);
			res.json({accessToken})
		}
	)
};

module.exports = {handleRefreshToken}

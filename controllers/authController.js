
/*
const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {this.users = data}
};
const fsPromise = require('fs').promises;
const path = require('path');
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../model/User');

const handleLogin = async (req, res) => {
	const {user, pwd} = req.body;
	if (!user || !pwd) {
		return res.status(400).json({'message': 'Username or Password are required'})
	}

	// const foundUser = usersDB.users.find(u => u.username === user);
	const foundUser = await User.findOne({username: user});

	if (!foundUser) {
		return res.status(401).json({'message': 'Unauthorized, not yet registered'})
	}

//	evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {

		const roles = Object.values(foundUser.roles);
		//  create JWT
		const accessToken = jwt.sign(
			{'UserInfo': {
								'username': foundUser.username,
								'roles': roles
							}
					},
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '300s'}
		);

		const refreshToken = jwt.sign(
			{'username': foundUser.username},
			process.env.REFRESH_TOKEN_SECRET,
			{expiresIn: '1d'}
		);

		// save refreshToken with current user
		/*
		const otherUsers = usersDB.users.filter(u => u.username !== foundUser.username);
		// add refresh token on current user
		const currentUser = {...foundUser, refreshToken};
		// at moment, the current user has property of refreshToken
		usersDB.setUsers([...otherUsers, currentUser]);

		// store the current users in database
		await fsPromise.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);
		*/

		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		console.log('result: auth', result);

		// store refreshToken in cookie
		res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 24*60*60*1000}) // secure: true,
		res.json({accessToken}); // store the access token in memory

	} else {
		res.status(401).json({'message': 'Unauthorized, password not match'})
	}
};

module.exports = {handleLogin}

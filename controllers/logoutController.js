

const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {this.users = data}
};

const fsPromise = require('fs').promises;
const path = require('path');


const handleLogout = async (req, res) => {

	// on client, also delete the accessToken
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(204); // no content
	}
	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;

	const foundUser = usersDB.users.find(u => u.refreshToken === refreshToken);
	if (!foundUser) {
		res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000});
		return res.status(403).json({'message': 'Unauthorized, not yet registered'})
	}

//	 delete refresh token in db
	const otherUsers = usersDB.users.filter(u => u.refreshToken !== foundUser.refreshToken);
	const currentUser = {...foundUser, refreshToken: ''};
	usersDB.setUsers([...otherUsers, currentUser]);

	await fsPromise.writeFile(
		path.join(__dirname, '..', 'model', 'users.json'),
		JSON.stringify(usersDB.users)
	);

	res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000}); // secure: true --- only serves on https
	res.sendStatus(204);

};

module.exports = {handleLogout}

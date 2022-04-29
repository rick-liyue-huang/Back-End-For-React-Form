
const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {this.users = data}
};

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
	const {user, pwd} = req.body;
	if (!user || !pwd) {
		return res.status(400).json({'message': 'Username or Password are required'})
	}

	const foundUser = usersDB.users.find(u => u.username === user);

	if (!foundUser) {
		return res.status(401).json({'message': 'Unauthorized, not yet registered'})
	}

//	evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		// TODO: create JWT
		res.json({'success': `User ${user} is login`})
	} else {
		res.status(401).json({'message': 'Unauthorized, password not match'})
	}
};

module.exports = {handleLogin}

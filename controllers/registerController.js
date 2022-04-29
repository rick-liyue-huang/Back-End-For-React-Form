
const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {this.users = data}
};


const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const {user, pwd} = req.body;
	if (!user || !pwd) {
		return res.status(400).json({'message': 'Username or Password are required'});
	}

//	check the duplicated user
	const duplicated = usersDB.users.find(u => u.username === user);

	if (duplicated) {
		return res.sendStatus(409); // conflict
	}

	try {
	//	encrypt password
		const hashPwd = await bcrypt.hash(pwd, 10);
	//	store the new user
		const newUser = {'username': user, 'password': hashPwd};
		usersDB.setUsers([...usersDB.users, newUser]);
		await fsPromise.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		)
		console.log(usersDB.users);
		res.status(201).json({'success': `New user ${user} created`});

	} catch (err) {
		res.status(500).json({'message': err.message});
	}
}


module.exports = {
	handleNewUser,
}

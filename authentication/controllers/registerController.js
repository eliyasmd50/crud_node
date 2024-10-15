const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

exports.handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({"message": "username or password is required"});
    }
    const duplicate = usersDB.users.find(person => person.username == user);
    if (duplicate) {
        return res.sendStatus(409); //conflict
    }
    console.log("set headers1");
    try {
        //encrypt the password
        const hashPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = { "username": user, "password": hashPwd};
        usersDB.setUsers([...usersDB.users, newUser]);
        console.log("set headers2");
        await fsPromises.writeFile(
            path.join([__dirname, '..', 'model', 'users.json']),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({"message": `New User ${user} created Successfully`})
    } catch(err) {
        res.status(500).json({"message": err.message});
    }
}
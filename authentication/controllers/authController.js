const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd ) return res.status(400).json({"message": "username or password is required"});
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401); //unauthorized
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        //create JWT for user
        res.json({"success": `User ${user} is logged in!`});
    } else {
        res.sendStatus(401);//unauthorized
    }
}

module.exports = {handleLogin};
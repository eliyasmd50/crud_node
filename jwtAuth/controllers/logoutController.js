const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fspromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    //on client also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const  refreshToken = cookies.jwt;

    //Is RefreshToken in DB?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser){
        res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'})
        return res.sendStatus(204);  
    } 

    //Delete RefreshToken In DB
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fspromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'})//secure true only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }
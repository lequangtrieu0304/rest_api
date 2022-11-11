const User = require('../model/User');

const handledLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jsonwebtoken) return res.status(400).json({message: "cookies is require!"})

    const refreshToken = cookies.jsonwebtoken
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jsonwebtoken', {httpOnly: true})
        return res.sendStatus(201)
    }
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jsonwebtoken', {httpOnly: true});
    res.sendStatus(201);
}

module.exports = {
    handledLogout
}
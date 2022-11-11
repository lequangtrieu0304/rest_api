const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const handledLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ message: 'user and pass are require!' });

    const checkedUser = await User.findOne({ username: user }).exec();
    if (!checkedUser) return res.status(400).json({ message: "user khong ton tai!" })

    try {
        const role = Object.values(checkedUser.role)
        const checkedPwd = await bcrypt.compare(pwd, checkedUser.password);
        if (!checkedPwd) {
            return res.status(400).json({ message: "password khong dung!" })
        }
        else {
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": checkedUser.username,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            
            const refreshToken = jwt.sign(
                {
                    "username": checkedUser.username
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            checkedUser.refreshToken = refreshToken;
            const result = await checkedUser.save();
            console.log(result);
           
            res.cookie('jsonwebtoken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ accessToken, refreshToken })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'loi server!' })
    }
}

module.exports = {
    handledLogin
}
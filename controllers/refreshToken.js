const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handledRefresh = async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.jsonwebtoken) return res.status(400).json({ message: 'cookies khong ton tai' })
    const refreshToken = cookie.jsonwebtoken


    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.status(400).json({ message: "not found token!" })

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username)
                return res.status(400).json({ message: 'username khong dung!' })

            const role = Object.values(foundUser.role)
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": decoded.username,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken })
        }
    )
}

module.exports = {
    handledRefresh
}
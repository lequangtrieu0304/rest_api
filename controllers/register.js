const User = require('../model/User');
const bcrypt = require('bcrypt');

const handledRegister = async (req, res) => {
    const {user, pwd} = req.body
    if(!user || !pwd) return res.status(400).json({message: 'user and pass are require!'});
    
    const checkedUser = await User.findOne({username: user}).exec();
    if(checkedUser) return res.status(400).json({message: 'user da ton tai!'})

    try{
        const hashPwd = await bcrypt.hash(pwd, 10);
        const newUser = await User.create({
            "username": user,
            "role": {
                "user": 2001
            },
            "password": hashPwd
        });
        console.log(newUser);
        res.json(newUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'loi server'})
    }
}

module.exports = {
    handledRegister
}
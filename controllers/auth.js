const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    }

    if (!newUser.username || !newUser.password) return res.status(400).send('Fields cannot be blank')

    db.User.findOne({username: newUser.username}, (err, foundUser) => {
        if (err) return res.status(500).json(`Register findOne err: ${err}`)
        if (foundUser) return res.status(400).send('Username already exists')

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json(`Register genSalt err: ${err}`)
                
            bcrypt.hash(newUser.password, salt, (err, hashedPwd) => {
                if (err) return res.status(500).json(`Register hash err: ${err}`)
                newUser.password = hashedPwd;

                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json(`Register User create err: ${err}`);
                    const token = jwt.sign(
                        {
                            username: savedUser.username,
                            _id: savedUser._id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        },
                    );
                    return res.status(200).json({
                        message: 'New user created',
                        token
                    });
                });
            })
        })
    })
}

const login = (req, res) => {
    const user = {
        username = req.body.username,
        password = req.body.password
    }

    if (!user.username || !user.password) return res.status(400).send('Fields cannot be blank')

    db.User.findOne({username: user.username}, (err, foundUser) => {
        if (err) return res.status(500).json(`Login findOne err: ${err}`);
        if (!foundUser) return res.status(500).send('User not found');

        bcrypt.compare(user.password, foundUser.password, (err, match) =>{
            if (match) {
                const token = jwt.sign(
                    {
                        username: foundUser.username,
                        _id: foundUser._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30 days"
                    },
                );
                return res.status(200).json({
                    message: 'New user created',
                    token
                });
            }
        })
    })
}

module.exports = {
    register,
    login
}
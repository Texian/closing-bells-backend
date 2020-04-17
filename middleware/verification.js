const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers);
    let token = req.headers['authorization'];
    console.log(token);
    jwt.verify(
        token, process.env.JWT_SECRET,
        (err, decodedUser) => {
            if (err || !decodedUser) return res.status(401).json({error: 'Unauthorized Access'});
            req.user = decodedUser;
            next();
        }
    )
}

module.exports = verifyToken;
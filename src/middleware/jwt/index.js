const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = process.env 

const generateToken = (payload, expiresIn) => {
    return expiresIn ? 
        jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn }) :
        jwt.sign(payload, JWT_PRIVATE_KEY) ;
}

const signIn = (payload) => {
    const accessToken   = generateToken(payload, '1m');
    const publicToken   = generateToken(payload);
    return {accessToken, publicToken};
}

const verifyToken = (req, res, next) => {
    try {
        jwt.verify(req.headers['accesstoken'], JWT_PRIVATE_KEY);
        jwt.verify(req.headers['publictoken'], JWT_PRIVATE_KEY);
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signIn,
    verifyToken
}
const jwt = require('jsonwebtoken');

const NodeCache = require( "node-cache" );
const nodecache = new NodeCache();

const { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } = process.env 

const generateToken = (payload, expiresIn) => {
    return expiresIn ? 
        jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn }) :
        jwt.sign(payload, JWT_PUBLIC_KEY) ;
}

const signIn = (payload) => {
    const accessToken   = generateToken(payload, '1m');
    const publicToken   = generateToken(payload);
    nodecache.set(publicToken, accessToken, 60 * 2);
    return {accessToken, publicToken};
}

const verifyToken = (req, res, next) => {
    if(!nodecache.get(req.headers['publictoken'])){
        next({
            message : 'token not valid'
        });
        return;
    }
    
    jwt.verify(req.headers['accesstoken'], JWT_PRIVATE_KEY, (err, decode) => {
        if(err) req.headers['newaccesstoken'] = refreshToken(req.headers['publictoken'])
    });

    next();
}

const refreshToken = (publicToken) => {
    try {
        const { email } = jwt.verify(publicToken, JWT_PUBLIC_KEY);
        return generateToken( { email } , '1m');
    } catch (error) {
        next(error);
    }
}

const signOut = (req, res, next) => {
    nodecache.del(req.headers['publictoken']);
    next();
}

module.exports = {
    signIn,
    verifyToken,
    refreshToken,
    signOut
}
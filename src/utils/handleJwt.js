const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * debes pasar el objeto del usuario
 * @param {*} data
 */
const tokenSign = async (data) => {
    const sign = await jwt.sign(data,
        JWT_SECRET,
        {
            expiresIn: '4h',
        }
    );
    return sign
}


/**
 * aqui en viar el token de session
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        throw ({
            message: 'Token invalido',
            code: 403
        })
    }
}

module.exports = {
    tokenSign,
    verifyToken
}
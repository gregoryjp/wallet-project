const bcryptjs = require('bcryptjs');

/**
 * conrtrasena sin encriptar : abc15149
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 6)
    return hash
}


/**
 * pasar contrasena sin encriptar y encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */

const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword);
}


module.exports = {
    encrypt,
    compare
}
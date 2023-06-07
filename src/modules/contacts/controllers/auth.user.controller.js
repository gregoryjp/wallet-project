const services = require('../services/auth.user.services')


const register = async (req, res, next) => {
    try {
        const registerUser = await services.registerUser(req)
        res.send(registerUser)
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const loginUser = await services.login(req)
        res.send(loginUser)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    register,
    login,

}

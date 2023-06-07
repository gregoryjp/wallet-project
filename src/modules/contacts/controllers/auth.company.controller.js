const services = require('../services/auth.company.services');

const register = async (req, res, next) => {
    try {
        const registerCompany = await services.registerCompany(req)
        res.send(registerCompany)
    } catch (error) {
        next(error)
    }
}

const registerCompanyUser = async (req, res, next) => {
    try {
        const registerCompanyUser = await services.registerCompanyUser(req)
        res.send(registerCompanyUser)
    } catch (error) {
        next(error)
    }
}

const loginCompany = async (req, res, next) => {
    try {
        const login = await services.loginCompany(req)
        res.send(login)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    registerCompanyUser,
    loginCompany,
}
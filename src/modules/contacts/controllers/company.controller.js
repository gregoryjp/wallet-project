const transationsServices = require('../services/company.services')

const companyUsers = async (req, res, next) => {
    try {
        const companyUsers = await transationsServices.companyUsers(req)
        res.send(companyUsers)
    } catch (error) {
        next(error)
    }
}

const companyStatus = async (req, res, next) => {
    try {
        const companyStatus = await transationsServices.companyStatus(req)
        res.send(companyStatus)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const companyAbsorbUser = async (req, res, next) => {
    try {
        const companyAbsorbUser = await transationsServices.companyAbsorbUser(req)
        res.send(companyAbsorbUser)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    companyUsers,
    companyStatus,
    companyAbsorbUser,
}
const transationsServices = require('../services/user.services');

const accountUser = async (req, res, next) => {
    try {
        const accountUser = await transationsServices.accountUser(req)
        res.send(accountUser)
    } catch (error) {
        next(error)
    }
}
const allUser = async (req, res, next) => {
    try {
        const allUser = await transationsServices.allUser(req)
        res.send(allUser)
    } catch (error) {
        next(error)
    }
}
const getUsers = async (req, res, next) => {
    try {
        const getUsers = await transationsServices.getUsers(req)
        res.send(getUsers)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    accountUser,
    allUser,
    getUsers,
}
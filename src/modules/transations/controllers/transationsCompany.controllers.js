const transationsServices = require('../services/transationsCompany.services')

const companyTransaction = async (req, res, next) => {
    try {
        const companyTransaction = await transationsServices.companyTransaction(req)
        res.send(companyTransaction)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getTransactions = async (req, res, next) => {
    try {
        const getTransactions = await transationsServices.getTransactions(req)
        res.send(getTransactions)
    } catch (error) {
        next(error)
    }
}

const getTransactionsCompany = async (req, res, next) => {
    try {
        const getTransactionsCompany = await transationsServices.getTransactionsCompany(req)
        res.send(getTransactionsCompany)
    } catch (error) {
        next(error)
    }
}

const getCompanies = async (req, res, next) => {
    try {
        const getCompanies = await transationsServices.getCompanies(req)
        res.send(getCompanies)
    } catch (error) {
        next(error)
    }
}


const operations = async (req, res, next) => {
    try {
        const operations = await transationsServices.operations(req)
        res.send(operations)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    companyTransaction,
    getTransactions,
    getTransactionsCompany,
    getCompanies,
    operations,
}
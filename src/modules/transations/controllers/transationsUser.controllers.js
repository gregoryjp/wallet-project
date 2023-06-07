const transactionsServices = require('../services/transationsUser.services')

const transaction = async (req, res, next) => {
    try {
        const transaction = await transactionsServices.transaction(req)
        res.send(transaction)
    } catch (error) {
        next(error)
    }
}

const getTransaction = async (req, res, next) => {
    try {
        const getTransaction = await transactionsServices.getTransaction(req)
        res.send(getTransaction)
    } catch (error) {
        next(error)
    }
}

const invoice = async (req, res, next) => {
    try {
        const invoice = await transactionsServices.invoice(req)
        res.send(invoice)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const invoiceSearch = async (req, res, next) => {
    try {
        const invoiceSearch = await transactionsServices.invoiceSearch(req)
        res.send(invoiceSearch)
    } catch (error) {
        next(error)
    }
}

const adminGetTransaction = async (req, res, next) => {
    try {
        const adminGetTransaction = await transactionsServices.adminGetTransaction(req)
        res.send(adminGetTransaction)
    } catch (error) {
        console.log(error)
        next(error)

    }
}

const admingGetInvoice = async (req, res, next) => {
    try {
        const admingGetInvoice = await transactionsServices.admingGetInvoice(req)
        res.send(admingGetInvoice)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    transaction,
    getTransaction,
    invoice,
    adminGetTransaction,
    invoiceSearch,
    admingGetInvoice,

}
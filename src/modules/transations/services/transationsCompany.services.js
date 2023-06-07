require('dotenv').config();
const model = require('../model')
const { contacts } = require('../../contacts/model')
const { matchedData } = require('express-validator');
const CONSTANTS = require('../../../constants/util.constants');
const transactionAdapter = require('../adapter/transationsAdapter');
const commissionServices = require('./commissionServices')
const { EMAIL, RATE1, RATE2 } = process.env

const companyTransaction = async (req) => {
    try {
        const body = matchedData(req);
        const type = req.query
        const dataToken = req.credentials;
        const symbolCoin = body.symbol.toUpperCase();
        const currencyCoin = body.currency.toUpperCase();
        const generate = CONSTANTS.GENERATE_ALPHABET
        const users = await contacts.find({
            $or: [
                { email: type.to },
                { email: dataToken.email }
            ]
        });
        const to = users.find(to => to.email === type.to);
        const from = users.find(from => from.email === dataToken.email);
        const transactionId = generate();
        let status = CONSTANTS.STATUS_OPERATION.SUCCESS;
        let transactionAmount = body.amount - (body.amount * RATE1);
        let taxe = body.amount - transactionAmount;

        if (type.type === CONSTANTS.TYPE_TRANSACTION.TRANSFER) {
            if (!to) {
                throw ({
                    message: 'invalid transaction verify data ',
                    code: 400
                });
            }
            if (from.wallet.balance < body.amount) {
                throw ({
                    message: ' You do not have enough balance to make this transfer',
                    code: 400
                });
            }
            transactionAmount = body.amount
        }


        if (symbolCoin !== 'USD' || currencyCoin !== 'DOLAR') {
            throw ({
                message: 'sorry we only work with dollars',
                code: 400
            });
        }

        if (body.amount <= 0) {
            throw ({
                message: 'the balance to be sent cannot be negative',
                code: 400
            });
        }

        const newTransaction = await model.transaction.create({
            ...body,
            transactionId: transactionId,
            contactType: dataToken.contactType,
            detail: {
                amount: body.amount,
                taxe: taxe
            },
            totalAmount: transactionAmount,
            status: status,
            to: type?.to,
            from: dataToken?.email
        });

        if (type.type === CONSTANTS.TYPE_TRANSACTION.DEPOSIT) {

            commissionServices.companyUpdateTaxe(EMAIL, taxe, currencyCoin, symbolCoin)

            await contacts.findOneAndUpdate(
                { email: dataToken.email },
                {
                    $inc: { 'wallet.balance': transactionAmount },
                    'wallet.currency': body.currency,
                    'wallet.symbol': body.symbol
                },
                { new: true }
            );
            const transactionDeposit = transactionAdapter.transactionDeposit(newTransaction, body, taxe, transactionAmount);
            return transactionDeposit;
        }

        if (type.type === CONSTANTS.TYPE_TRANSACTION.TRANSFER) {

            await contacts.findOneAndUpdate(
                { email: from.email },
                {
                    $inc: { 'wallet.balance': - body.amount },
                    'wallet.currency': currencyCoin,
                    'wallet.symbol': symbolCoin
                },
                { new: true }
            );
            await contacts.findOneAndUpdate(
                { email: to.email },
                {
                    $inc: { 'wallet.balance': transactionAmount },
                    'wallet.currency': currencyCoin,
                    'wallet.symbol': symbolCoin
                },
                { new: true }
            );
            const transactionTransfer = transactionAdapter.transactionTransfer(newTransaction, to, type, status, transactionAmount);
            return transactionTransfer;
        }

    } catch (error) {
        throw error
    }
};

const getTransactions = async (req, res) => {
    try {
        let type = req.query
        const dataToken = req.credentials;
        const getTransaction = await model.transaction.find({
            from: dataToken.email,
            type: type.type,
        })
        if (!getTransaction) {
            throw ({
                message: 'No results were found for the search.',
                code: 400
            });

        }
        const dataList = getTransaction.map((getTransaction) => {
            return transactionAdapter.getTransactions(getTransaction)
        });
        return dataList


    } catch (error) {
        throw error
    }
}

const getCompanies = async (req) => {
    try {
        const companies = await contacts.find({ contactType: 'company' })
        if (!companies) {
            throw ({
                message: 'no',
                code: 400
            });
        }
        const getCompanies = companies.map((companies) => {
            return transactionAdapter.getCompaniesAdapter(companies)
        });
        return getCompanies

    } catch (error) {
        throw error
    }
}

const getTransactionsCompany = async (req) => {
    try {
        const body = req.body
        const { type, id } = req.query
        console.log(type)
        let query = {
            from: body.email,
            contactType: 'company',
            type: type
        }
        if (id) {
            query = {
                ...query,
                transactionId: id
            }
        }

        const transactions = await model.transaction.find(query)

        if (!transactions.length) {
            throw ({
                message: 'invalid transaction verify data ',
                code: 400
            });
        }

        const totalAmountSum = transactions.reduce((accumulator, transaction) => {
            return accumulator + transaction.totalAmount;
        }, 0);

        return {
            transactions,
            totalAmountSum
        }
    } catch (error) {
        throw error
    }
}



const operations = async (req) => {
    try {
        const { status } = req.query;
        const transactions = await model.transaction.find({ status: status, contactType: 'company' });
        return transactions

    } catch (error) {
        throw error
    }
}

module.exports = {
    getCompanies,
    companyTransaction,
    getTransactions,
    getTransactionsCompany,
    operations,

}
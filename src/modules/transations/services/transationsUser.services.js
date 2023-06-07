require('dotenv').config();
const model = require('../model')
const { contacts } = require('../../contacts/model')
const { matchedData } = require('express-validator');
const CONSTANTS = require('../../../constants/util.constants');
const transactionAdapter = require('../adapter/transationsAdapter');
const commissionServices = require('./commissionServices')
const { EMAIL, RATE1, RATE2 } = process.env

const transaction = async (req) => {
    try {
        const body = matchedData(req);
        const type = req.query
        const dataToken = req.credentials;
        const symbolCoin = body.symbol.toUpperCase();
        const currencyCoin = body.currency.toUpperCase();
        const generate = CONSTANTS.GENERATE_ALPHABET
        const today = new Date();
        today.setHours(0, 0, 0, 0);
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

        if (from.wallet.balance <= 0) {
            throw ({
                message: 'Please recharge your account balance in order to successfully complete the transfer',
                code: 400
            });
        }

        if (type.type === CONSTANTS.TYPE_TRANSACTION.TRANSFER) {
            if (!to) {
                throw ({
                    message: 'invalid transaction verify data ',
                    code: 400
                });
            }
            if (body.amount > 10000 || (from.wallet.balance < body.amount)) {
                status = CONSTANTS.STATUS_OPERATION.REVISION;
            }
            transactionAmount = body.amount * RATE2;
            taxe = body.amount - transactionAmount;
        }

        const result = await model.transaction.aggregate([
            {
                $match: {
                    createdAt: { $gte: today },
                    type: CONSTANTS.TYPE_TRANSACTION.TRANSFER,
                    from: dataToken.email,
                    status: CONSTANTS.STATUS_OPERATION.SUCCESS,
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$totalAmount" }
                }
            }
        ]);

        if (result.length > 0) {
            const totalAmount = result[0].totalAmount;
            const sumaTotal = transactionAmount + totalAmount;

            if (sumaTotal > 10000) {
                status = CONSTANTS.STATUS_OPERATION.REVISION;
            }
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

            await commissionServices.companyUpdateTaxe(EMAIL, taxe, currencyCoin, symbolCoin)

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

        if (status === CONSTANTS.STATUS_OPERATION.REVISION) {
            throw ({
                message: 'the transaction exceeds the limit allowed per day, STATUS:REVISION',
                code: 400
            });
        }

        await commissionServices.companyUpdateTaxe(EMAIL, taxe, currencyCoin, symbolCoin)

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

    } catch (error) {
        throw error
    }
};

const getTransaction = async (req) => {
    try {
        const type = req.query
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

const invoice = async (req) => {
    try {
        const body = matchedData(req)
        const dataToken = req.credentials;
        const generate = CONSTANTS.GENERATE_NUMBER
        const invoiceId = generate();
        const symbolCoin = body.symbol.toUpperCase();
        const currencyCoin = body.currency.toUpperCase();
        let status = CONSTANTS.STATUS_OPERATION.PENDING
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const user = await contacts.findOne({ email: body.to, contactType: 'user' })

        if (!user || body.to === dataToken.email) {
            throw ({
                message: 'invalid transaction verify data ',
                code: 400
            });
        }
        if (symbolCoin !== 'USD' || currencyCoin !== 'DOLAR') {
            throw ({
                message: 'sorry we only work with dollars ',
                code: 400
            });
        }

        if (body.amount <= 0) {
            throw ({
                message: 'the balance to be sent cannot be negative ',
                code: 400
            });
        }


        const invoice = await model.invoice.create({
            ...body,
            invoiceId: invoiceId,
            from: dataToken.email,
            status: status,
        });

        return {
            invoice
        }


    } catch (error) {
        throw error
    }
}

const invoiceSearch = async (req) => {
    try {
        const type = req.query.type;
        const dataToken = req.credentials;
        let status = CONSTANTS.STATUS_OPERATION.PENDING
        const invoice = await model.invoice.find({ [type]: dataToken.email, status: status, })
        if (!invoice) {
            throw ({
                message: 'invalid transaction verify data ',
                code: 400
            });
        }

        return {
            invoice
        }
    } catch (error) {
        throw error
    }
}

const adminGetTransaction = async (req) => {
    try {
        const body = req.body
        const { type, id, status } = req.query
        const query = []

        query.push({
            from: body.email,
            contactType: 'user',
            type: type
        })

        if (status) {
            query.push({ status: status })
        }
        if (id) {
            query.push({
                transactionId: id
            })
        }

        const transactions = await model.transaction.find({
            $or: [...query]
        })

        if (!transactions.length) {
            throw ({
                message: 'there are no transactions with that status',
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

const admingGetInvoice = async (req) => {
    try {
        const { status, id, from } = req.query
        let query = {
            status: status
        }
        if (id) {
            query = {
                ...query,
                invoiceId: id
            }
        }
        if (from) {
            query = {
                ...query,
                from: from,

            }
        }
        const invoice = await model.invoice.find(query);

        return invoice

    } catch (error) {
        throw error
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
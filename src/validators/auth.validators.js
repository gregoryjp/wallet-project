const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');
const moment = require('moment');

const registerUser = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail().withMessage('@'),
    check('password')
        .exists()
        .notEmpty()
        .isLength(),
    check('name')
        .exists()
        .notEmpty()
        .isLength(),
    check('lastName')
        .exists()
        .notEmpty()
        .isLength(),
    check('age')
        .exists()
        .isNumeric(),
    check('nacionId')
        .exists()
        .isNumeric(),
    check('country')
        .exists()
        .notEmpty()
        .isLength(),
    check('address')
        .exists()
        .notEmpty()
        .isLength(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const registerCompany = [
    check('name')
        .exists()
        .notEmpty()
        .isLength(),
    check('taxIdNumber')
        .exists()
        .notEmpty()
        .isLength({ min: 5 }).withMessage('min 5 characters'),
    check('email')
        .exists()
        .notEmpty()
        .isEmail().withMessage('@'),
    check('password')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),
    check('country')
        .exists()
        .notEmpty()
        .isLength(),
    check('address')
        .exists()
        .notEmpty()
        .isLength(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const companyRegisterUser = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail().withMessage('@'),
    check('password')
        .exists()
        .notEmpty()
        .isLength(),
    check('name')
        .exists()
        .notEmpty()
        .isLength(),
    check('lastName')
        .exists()
        .notEmpty()
        .isLength(),
    check('age')
        .exists()
        .isNumeric(),
    check('nacionId')
        .exists()
        .isNumeric(),
    check('country')
        .exists()
        .notEmpty()
        .isLength(),
    check('address')
        .exists()
        .notEmpty()
        .isLength(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const loginUser = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const transaction = [
    check('type').custom((value) => {
        if (value !== 'deposit' && value !== 'transfer') {
            throw ('The value of type must be "deposit" or "transfer"');
        }
        return true;
    }),
    check('currency')
        .exists()
        .notEmpty()
        .isLength(),
    check('symbol')
        .exists()
        .notEmpty()
        .isLength(),
    check('amount')
        .exists()
        .notEmpty()
        .isLength()
        .isNumeric(),
    check('description')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 190 }),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const email_type = [
    check('email')
        .exists()
        .notEmpty()
        .isLength()
        .isEmail().withMessage('enter the email right use -@- '),
    check('type').custom((value) => {
        if (value !== 'deposit' && value !== 'transfer') {
            throw ('The value of type must be "deposit" or "transfer"');
        }
        return true;
    }),
    check('id')
        .optional(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const typeTransaction = [
    check('type').custom((value) => {
        if (value !== 'deposit' && value !== 'transfer') {
            throw ('The value of type must be "deposit" or "transfer"');
        }
        return true;
    }),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const email = [
    check('email')
        .exists()
        .notEmpty()
        .isLength()
        .isEmail().withMessage('please enter the right email "@"'),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const type = [
    check('type').custom((value) => {
        if (value !== 'deposit' && value !== 'transfer') {
            throw ('The value of type must be "deposit" or "transfer"');
        }
        return true;
    }),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const invoice = [
    check('to')
        .exists()
        .notEmpty()
        .isEmail()
        .isLength(),
    check('dateExpire')
        .custom((value) => {
            if (!moment(value, 'DD/MM/YYYY', true).isValid()) {
                throw new Error('The expiration date must be in the format DD / MM / YYYY.');
            }
            return true;
        }),
    check('description')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 1000 }),
    check('currency')
        .exists()
        .notEmpty()
        .isLength(),
    check('symbol')
        .exists()
        .notEmpty()
        .isLength(),
    check('amount')
        .exists()
        .notEmpty()
        .isLength()
        .isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const transactionId = [
    check('transationId')
        .exists()
        .notEmpty()
        .isLength(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]


const searchInvoice = [

    check('type').custom((value) => {
        if (value !== 'from' && value !== 'to') {
            throw ('The value of type must be "from" or "to"');
        }
        return true;
    }),

    (req, res, next) => {
        return validateResults(req, res, next)
    }

]







module.exports = {
    registerUser,
    loginUser,
    email_type,
    email,
    companyRegisterUser,
    transaction,
    registerCompany,
    invoice,
    transactionId,
    type,
    searchInvoice,
    typeTransaction
}
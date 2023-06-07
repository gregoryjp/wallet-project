
const { customAlphabet } = require('nanoid');


const STATUS_OPERATION = {
    SUCCESS: 'success',
    PENDING: 'pending',
    CANCEL: 'cancel',
    REVISION: 'revision',
    PAYMENT: 'payment',
    EXPIRE: 'expire',
    ADVANCEMENT: 'advancement',
    DELETE: 'delete',
    ALL: 'all'
}
const TYPE_TRANSACTION = {
    DEPOSIT: 'deposit',
    TRANSFER: 'transfer'
}
const COUNTRY_ACCEPTED = ['ARGENTINA', 'BRASIL', 'PERU', 'CHILE', 'VENEZUELA', 'USA']
const COUNTRY_COMPANY_ACCEPTED = ['ARGENINA', 'BRASIL', 'PERU', 'USA']
const TRANSACTION = ['success', 'pending', 'cancel', 'revision', 'payment', 'expire', 'advancement'];

const CONTACTS = {
    USER: 'user',
    COMPANY: 'company'
}


const GENERATE_ALPHABET = customAlphabet('1234567890abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ', 10);
const GENERATE_NUMBER = customAlphabet('1234567890', 6);


module.exports = {
    STATUS_OPERATION,
    COUNTRY_ACCEPTED,
    COUNTRY_COMPANY_ACCEPTED,
    TRANSACTION,
    TYPE_TRANSACTION,
    CONTACTS,
    GENERATE_ALPHABET,
    GENERATE_NUMBER,
}
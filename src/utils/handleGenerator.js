const { customAlphabet } = require('nanoid');
const generate = customAlphabet('1234567890abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ', 10)

module.exports = generate
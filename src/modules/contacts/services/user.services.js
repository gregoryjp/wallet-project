const { matchedData } = require('express-validator');
const model = require('../model');
const contactAdapter = require('../adapter/contact.adapter');

const accountUser = async (req) => {
    try {
        const dataToken = req.credentials;
        const user = await model.contacts.findOne({ email: dataToken.email })
        if (!user) {
            throw ({
                message: 'The search could not be completed due to an internal error',
                code: 401
            });
        }
        const account = await contactAdapter.getAccountUserAdapter(user)

        return account
    } catch (error) {
        throw error
    }
}
const allUser = async (req) => {
    try {
        const body = matchedData(req)
        const user = await model.contacts.findOne({ email: body.email, contactType: 'user' })
        if (!user) {
            throw ({
                message: 'user not found',
                code: 401
            });
        }
        return contactAdapter.allUserAdapter(user)
    } catch (error) {
        throw error
    }
}
const getUsers = async (req) => {
    try {
        const users = await model.contacts.find({ contactType: 'user' })
        if (!users) {
            throw ({
                message: 'No users found',
                code: 401
            });
        }
        const dataUser = users.map((users) => {
            return contactAdapter.getUsersAdapter(users)
        });
        return dataUser
    } catch (error) {
        throw error
    }
}
module.exports = {
    accountUser,
    allUser,
    getUsers,
}
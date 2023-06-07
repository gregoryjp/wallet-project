const { matchedData } = require('express-validator');
const model = require('../model');
const contactAdapter = require('../adapter/contact.adapter');

const companyUsers = async (req) => {
    try {
        const dataToken = req.credentials;
        const user = await model.contacts.find({ companyId: dataToken.email })
        if (!user.length) {
            throw ({
                message: 'There are currently no registered users for this company',
                code: 401
            });
        }
        const usersCompany = user.map((user) => {
            return contactAdapter.companyUsersAdapter(user)
        });

        return usersCompany
    } catch (error) {
        throw error
    }
}

const companyStatus = async (req, res) => {
    try {
        const dataToken = req.credentials;
        const company = await model.contacts.findOne({ email: dataToken.email })
        if (!company) {
            throw ({
                message: 'Could not be completed due to an internal error',
                code: 401
            });
        }
        const status = await contactAdapter.companyStatusAdapter(company)
        return status
    } catch (error) {
        throw error
    }
}

const companyAbsorbUser = async (req, res) => {
    try {
        const body = matchedData(req)
        const dataToken = req.credentials;
        const user = await model.contacts.findOne({ email: body.email })
        if (!user) {
            throw ({
                message: 'An error occurred while validating the form. Please, check your data and try again',
                code: 401
            });

        }
        if (user.companyId === dataToken.email) {
            throw ({
                message: 'invalid action check data',
                code: 401
            });
        }
        const userAbsorb = await model.contacts.findOneAndUpdate({ email: body.email }, { companyId: dataToken.email }, { new: true })
        const dataResp = await contactAdapter.companyAbsorbUserAdapter(userAbsorb)
        return dataResp
    } catch (error) {
        throw error
    }
}

module.exports = {
    companyUsers,
    companyStatus,
    companyAbsorbUser
}
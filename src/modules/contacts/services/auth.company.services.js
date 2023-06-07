const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../../../utils/handlePassword');
const { tokenSign, verifyToken } = require('../../../utils/handleJwt')
const { contacts } = require('../model');
const { COUNTRY_COMPANY_ACCEPTED, COUNTRY_ACCEPTED, CONTACTS } = require('../../../constants/util.constants')
const contactAdapter = require('../adapter/contact.adapter');

const registerCompany = async (req) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password };
        const company = await contacts.findOne({
            $or: [
                { taxIdNumber: body.taxIdNumber },
                { email: body.email }
            ]
        });
        if (company) {
            throw ({
                message: 'An error occurred while validating the form. Please, check your data and try again',
                code: 401
            });
        }

        if (!COUNTRY_COMPANY_ACCEPTED.includes(body.country.toUpperCase())) {
            throw ({
                message: 'allowed countries : VENEZUELA, PERU, CHILE, BRASIL, ARGENTINA, USA',
                code: 401
            });
        }
        if (!body.nacionId) {
            contactType = CONTACTS.COMPANY
        }
        const data = await contacts.create({ ...body, contactType });
        const contact = contactAdapter.registerCompanyAdapter(data);
        const token = await tokenSign(contact)
        return {
            contact,
            token
        }
    } catch (error) {
        throw error;
    }
}
const registerCompanyUser = async (req) => {
    try {
        const reqData = matchedData(req)
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)
        const password = await encrypt(reqData.password);
        const body = { ...reqData, password };
        const user = await contacts.findOne({
            $or: [
                { email: reqData.email },
                { nacionId: body.nacionId }
            ]
        });

        if (user) {
            throw ({
                message: 'An error occurred while validating the form. Please, check your data and try again',
                code: 401
            });

        }
        if (!body.taxIdNumber) {
            contactType = CONTACTS.USER
        }
        if (body.age < 18 || body.age > 65) {
            throw ({
                message: 'allowed age over 18 and under 65.',
                code: 401
            });

        }
        if (!COUNTRY_ACCEPTED.includes(body.country.toUpperCase())) {
            throw ({
                message: 'allowed countries : VENEZUELA, PERU, CHILE, BRASIL, ARGENTINA, USA',
                code: 401
            });

        }
        const data = await contacts.create({ ...body, companyId: dataToken.email, contactType });
        const contact = await contactAdapter.registerCompanyUserAdapter(data);
        const tokenData = await tokenSign(contact)
        return {
            contact,
            tokenData
        }
    } catch (error) {
        throw error
    }
}
const loginCompany = async (req) => {
    try {
        const body = matchedData(req)
        const company = await contacts.findOne({ email: body.email })
        if (!company) {
            throw ({
                message: 'An error occurred while validating the form. Please, check your data and try again',
                code: 401
            });

        }
        const hashPassword = company.password;
        const check = await compare(body.password, hashPassword);
        if (!check) {
            throw ({
                message: 'An error occurred while validating the form. Please, check your data and try again',
                code: 401
            });

        }
        const contact = contactAdapter.registerCompanyAdapter(company);
        const token = await tokenSign(contact)
        return {
            contact,
            token
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerCompany,
    loginCompany,
    registerCompanyUser
}
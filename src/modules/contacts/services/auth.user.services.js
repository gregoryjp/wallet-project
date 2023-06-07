const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../../../utils/handlePassword');
const { tokenSign } = require('../../../utils/handleJwt');
const { contacts } = require('../model');
const contactAdapter = require('../adapter/contact.adapter');
const { COUNTRY_ACCEPTED, CONTACTS } = require('../../../constants/util.constants');

const registerUser = async (req) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password);
        const body = { ...req, password };
        const user = await contacts.findOne({
            $or: [
                { email: body.email },
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
                message: 'allowed age over 18 and under 65',
                code: 401
            });
        }
        if (!COUNTRY_ACCEPTED.includes(body.country.toUpperCase())) {
            throw ({
                message: 'allowed countries : VENEZUELA, PERU, CHILE, BRASIL, ARGENTINA, USA',
                code: 401
            });

        }

        const data = await contacts.create({ ...body, contactType: contactType });
        const contact = contactAdapter.registerAdapter(data);
        const token = await tokenSign(contact);
        return {
            contact,
            token
        }

    } catch (error) {
        throw error;
    }
}

const login = async (req) => {
    try {
        const body = matchedData(req)
        const user = await contacts.findOne({ email: body.email, })
        if (!user) {
            throw ({
                message: 'An error occurred while validating the form. Please, check your data and try again',
                code: 401
            });

        }
        const hashPassword = user.password;
        const check = await compare(body.password, hashPassword);
        if (!check) {
            throw ({
                message: 'An error occurred while validating the form. Please, check your data and try again',
                code: 401
            });

        }
        const contact = contactAdapter.loginAdapter(user);
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
    registerUser,
    login
}
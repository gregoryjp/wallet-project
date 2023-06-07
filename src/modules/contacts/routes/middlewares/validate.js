
const { verifyToken } = require('../../../../utils/handleJwt')


const rolAdmin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw ({
                message: 'no token',
                code: 400
            });
        }
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)
        req.credentials = dataToken;
        if (dataToken.contactType !== 'admin') {
            throw ({
                message: 'not authorization',
                code: 400
            });
        }
        next()
    } catch (error) {
        next(error)
    }
}

const rolCompany = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw ({
                message: 'no token',
                code: 400
            });
        }
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)
        req.credentials = dataToken;
        if (dataToken.contactType !== 'company' && dataToken.contactType !== 'admin') {
            throw ({
                message: 'not authorization',
                code: 400
            });
        }
        next()
    } catch (error) {
        next(error)
    }
}

const rolUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw ({
                message: 'no token',
                code: 400
            });
        }
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)
        req.credentials = dataToken;
        if (dataToken.contactType !== 'user' && dataToken.contactType !== 'admin') {
            throw ({
                message: 'not authorization',
                code: 400
            });
        }
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = {
    rolAdmin,
    rolCompany,
    rolAdmin,
    rolUser
}
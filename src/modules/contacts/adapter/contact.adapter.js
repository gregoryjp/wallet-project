const registerAdapter = (payload) => {
    const contact = {
        email: payload.email,
        name: payload.name,
        lastName: payload.lastName,
        age: payload.age,
        nacionId: payload.nacionId,
        country: payload.country,
        address: payload.address,
        contactType: payload.contactType,
        companyId: payload.companyId,
        createdAt: payload.createdAt,

    }
    return contact;
}

const loginAdapter = (payload) => {
    const contact = {
        email: payload.email,
        name: payload.name,
        lastName: payload.lastName,
        age: payload.age,
        nacionId: payload.nacionId,
        country: payload.country,
        address: payload.address,
        contactType: payload.contactType,
        createdAt: payload.createdAt,

    }
    return contact;
}

const registerCompanyAdapter = (payload) => {
    const contact = {
        name: payload.name,
        email: payload.email,
        taxIdNumer: payload.taxIdNumber,
        country: payload.country,
        address: payload.address,
        contactType: payload.contactType,
        createdAt: payload.createdAt,
    }
    return contact
}

const loginCompanyAdapter = (payload) => {
    const contact = {
        id: payload._id,
        email: payload.email,
        name: payload.name,
        country: payload.country,
        taxIdNumber: payload.taxIdNumber,
        contactType: payload.contactType,
    }
    return contact
}

const registerCompanyUserAdapter = (payload) => {
    const contact = {
        email: payload.email,
        name: payload.name,
        lastName: payload.lastName,
        age: payload.age,
        country: payload.country,
        address: payload.address,
        contactType: payload.contactType,
        companyId: payload.companyId,
        createdAt: payload.createdAt,
    }
    return contact
}

const accountUserAdapter = (payload) => {
    const contact = {
        email: payload.email,
        name: payload.name,
        lastName: payload.lastName,
        nacionId: payload.nacionId,
        currency: payload.wallet.currency,
        symbol: payload.wallet.symbol,
        balance: payload.wallet.balance,
        contactType: payload.contactType,
    }
    return contact
}

const companyUsersAdapter = (user) => {
    const contact = {
        companyId: user.companyId,
        name: user.name,
        lastName: user.lastName,
        nacionId: user.nacionId,
        email: user.email,
        country: user.country,
        address: user.address,
        contactType: user.contactType,
        wallet: user.wallet,
    }
    return contact
}
const companyUsersCompanyAdapter = (dataToken) => {
    const contact = {
        email: dataToken.email,
        name: dataToken.name,
        taxIdNumber: dataToken.taxIdNumer,
        country: dataToken.country,
        contactType: dataToken.contactType
    }
    return contact
}

const companyStatusAdapter = (company) => {
    const contact = {
        wallet: company.wallet,
    }
    return contact
}

const companyAbsorbUserAdapter = (userAbsorb) => {
    const contact = {
        companyId: userAbsorb.companyId,
        name: userAbsorb.name,
        lastName: userAbsorb.lastName,
        nacionId: userAbsorb.nacionId,
        email: userAbsorb.email,
        age: userAbsorb.age,
        country: userAbsorb.country,
        wallet: userAbsorb.wallet,
        type: userAbsorb.type,
    }
    return contact
}

const getAccountUserAdapter = (user) => {
    const contact = {
        wallet: user.wallet
    }
    return contact
}

const allUserAdapter = (user) => {
    const contact = {
        companyId: user.companyId,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        age: user.age,
        nacionId: user.nacionId,
        contactType: user.contactType,
        country: user.country,
        address: user.address,
        wallet: user.wallet
    }
    return contact
}

const getUsersAdapter = (users) => {
    const contact = {
        email: users.email,
        name: users.name,
        lastName: users.lastName,
        age: users.age,
        nacionId: users.nacionId,
        contactType: users.contactType,
        country: users.country,
        address: users.address,
        wallet: users.wallet
    }
    return contact
}




module.exports = {
    registerAdapter,
    loginAdapter,
    registerCompanyAdapter,
    loginCompanyAdapter,
    registerCompanyUserAdapter,
    accountUserAdapter,
    companyUsersAdapter,
    companyUsersCompanyAdapter,
    companyStatusAdapter,
    companyAbsorbUserAdapter,
    getAccountUserAdapter,
    allUserAdapter,
    getUsersAdapter,
}




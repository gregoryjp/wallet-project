


const userDepositAdapter = (deposit, type, body, taxe, depositAmount) => {
    const contact = {
        transationId: deposit.transationId,
        type: type.type,
        currency: body.currency,
        symbol: body.symbol,
        detail: {
            amount: body.amount,
            taxe: taxe
        },
        TotalAmount: depositAmount
    };
    return contact;
};

const userTransferAdapter = (transaction, dataTo, dataFrom, resto, transferAmount) => {
    const contact = {
        transationId: transaction.transationId,
        from: dataFrom.email,
        to: dataTo.email,
        type: transaction.type,
        currency: transaction.currency,
        symbol: transaction.symbol,
        comision: resto,
        amount: transferAmount,
        status: transaction.status,
        createdAt: transaction.createdAt,
    }
    return contact
}



const depositCompanyAdapter = (deposit, company, resto) => {
    const contact = {
        transationId: deposit.transationId,
        from: company.email,
        contactType: deposit.contactType,
        type: deposit.type,
        currency: deposit.currency,
        symbol: deposit.symbol,
        amount: deposit.amount,
        comicion: resto,
        balanceTotal: company.wallet.balance,
        description: deposit.description,
        status: deposit.status
    }
    return contact
}

const getDepositAdapter = (dataDeposit) => {
    const contact = {
        transationId: dataDeposit.transationId,
        type: dataDeposit.type,
        detail: dataDeposit.detail,
        currency: dataDeposit.currency,
        symbol: dataDeposit.symbol,
        totalAmount: dataDeposit.totalAmount,
        description: dataDeposit.description,
        status: dataDeposit.status
    }
    return contact
}

const getTranfersAdapter = (dataTranfers) => {
    const contact = {
        transationId: dataTranfers.transationId,
        from: dataTranfers.from,
        to: dataTranfers?.to,
        type: dataTranfers.type,
        detail: dataTranfers.detail,
        currency: dataTranfers.currency,
        symbol: dataTranfers.symbol,
        totalAmount: dataTranfers.totalAmount,
        description: dataTranfers.description,
        status: dataTranfers.status
    }
    return contact
}

const getCompaniesAdapter = (companies) => {
    const contact = {
        email: companies.email,
        name: companies.name,
        taxIdNumber: companies.taxIdNumber,
        country: companies.country,
        address: companies.address,
        wallet: companies.wallet,
        contactType: companies.contactType,
    }
    return contact
}

const getTransactions = (getTransaction) => {
    const contact = {
        transactionId: getTransaction.transactionId,
        to: getTransaction?.to,
        type: getTransaction?.type,
        description: getTransaction.description,
        currency: getTransaction.currency,
        symbol: getTransaction.symbol,
        detail: getTransaction.detail,
        totalAmount: getTransaction.totalAmount,
        status: getTransaction.status,
    }
    return contact
}

const getTransactionDeposit = (getTransaction) => {
    const contact = {
        transactionId: getTransaction.transactionId,
        type: getTransaction.type,
        description: getTransaction.description,
        currency: getTransaction.currency,
        symbol: getTransaction.symbol,
        detail: getTransaction.detail,
        totalAmount: getTransaction.totalAmount,
        status: getTransaction.status,
    }
    return contact
}


const transactionTransfer = (newTransaction, to, type, status, transactionAmount) => {
    const contact = {
        transactionId: newTransaction.transactionId,
        to: to.email,
        type: type.type,
        detail: newTransaction.detail,
        totalAmount: transactionAmount,
        status: status
    }
    return contact
}
const companytransactionTransfer = (newTransaction, to, type, status, body) => {
    const contact = {
        transactionId: newTransaction.transactionId,
        to: to.email,
        type: type.type,
        detail: newTransaction.detail,
        totalAmount: body.amount,
        status: status
    }
    return contact
}

const transactionDeposit = (newTransaction, body, taxe, transactionAmount) => {
    const contact = {
        transactionId: newTransaction.transactionId,
        currency: body.currency,
        symbol: body.symbol,
        detail: {
            amount: body.amount,
            taxe: taxe
        },
        totalAmount: transactionAmount
    }
    return contact
}



const company = (company) => {
    const contact = {
        contactType: company.contactType,
        email: company.email,
        name: company.name,
        taxIdNumber: company.taxIdNumber,
        country: company.country,
        address: company.address,
        wallet: company.wallet,
    }
    return contact
}

module.exports = {
    userDepositAdapter,
    userTransferAdapter,
    depositCompanyAdapter,
    getDepositAdapter,
    getTranfersAdapter,
    getCompaniesAdapter,
    getTransactions,
    getTransactionDeposit,
    transactionTransfer,
    transactionDeposit,
    companytransactionTransfer,
    company,

}




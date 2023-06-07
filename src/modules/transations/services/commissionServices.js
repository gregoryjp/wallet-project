const { contacts } = require('../../contacts/model')
//We send the transaction commission to the root company
companyUpdateTaxe = async (EMAIL, taxe, currencyCoin, symbolCoin) => {
    await contacts.findOneAndUpdate(
        { email: EMAIL },
        {
            $inc: { 'wallet.balance': taxe },
            'wallet.currency': currencyCoin,
            'wallet.symbol': symbolCoin
        },
        { new: true }
    );
};


module.exports = { companyUpdateTaxe }



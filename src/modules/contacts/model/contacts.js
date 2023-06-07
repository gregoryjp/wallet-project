const mongoose = require("mongoose");


const ContactScheme = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
        },
        lastName: {
            type: String,
        },
        taxIdNumber: {
            type: Number,
        },
        age: {
            type: Number,
        },
        nacionId: {
            type: Number,
        },
        password: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        contactType: {
            type: String,
            enum: ['user', 'company', 'admin'],
        },
        companyId: {
            type: String,
        },
        wallet: {
            currency: {
                type: String,
            },
            symbol: {
                type: String,
            },
            balance: {
                type: Number,
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,

    }
);
module.exports = mongoose.model('contacts', ContactScheme)
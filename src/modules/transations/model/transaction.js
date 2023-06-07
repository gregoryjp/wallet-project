const mongoose = require("mongoose");


const TransationsScheme = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            unique: true,
        },
        contactType: {
            type: String,
            enum: ['user', 'company'],
        },

        from: {
            type: String,
        },
        to: {
            type: String,
        },
        type: {
            type: String,
            enum: ['deposit', 'transfer'],
        },
        detail: {
            amount: {
                type: Number,
            },
            taxe: {
                type: Number,
            },
        },
        currency: {
            type: String,
        },
        symbol: {
            type: String,
        },
        totalAmount: {
            type: Number,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'success', 'canceled', 'revent', 'revision'],
        },

    },
    {
        timestamps: true,
        versionKey: false,

    }
);
module.exports = mongoose.model('transaction', TransationsScheme)
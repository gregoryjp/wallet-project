const mongoose = require("mongoose");
const moment = require('moment');


const InvoiceSchema = new mongoose.Schema(
    {
        invoiceId: {
            type: String,
            unique: true,
            required: true
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        type: {
            type: String,
            default: 'invoice',
        },
        description: {
            type: String,
        },
        currency: {
            type: String,
        },
        symbol: {
            type: String,
        },
        detail: {
            advancement: {
                type: Number
            },
            amount: {
                type: Number,
            },
        },

        totalAmount: {
            type: Number,
        },
        dateExpire: {
            type: String,
            validate: {
                validator: function (value) {
                    return moment(value, 'DD/MM/YYYY', true).isValid();
                },
                message: 'La fecha de vencimiento debe tener el formato DD/MM/YYYY.',
            },
        },
        status: {
            type: String,
            enum: ['payment', 'expire', 'advancement', 'pending'],
        },

    },
    {
        timestamps: true,
        versionKey: false,

    }
);
module.exports = mongoose.model('invoice', InvoiceSchema)
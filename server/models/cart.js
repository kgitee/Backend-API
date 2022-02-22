const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: String,
        ref: "user"
    },
    products: [{
        productId: {
            type: String,
            ref: "product"
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            deafult: 1
        },
        price: Number
    }],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Cart',cartSchema);
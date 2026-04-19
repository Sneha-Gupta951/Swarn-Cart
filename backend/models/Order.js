const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        id: String,
        name: String,
        price: Number,
        qty: Number,
        image: String
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    status: { type: String, default: 'Processing', enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] },
    paymentMethod: { type: String, default: 'QR Payment' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

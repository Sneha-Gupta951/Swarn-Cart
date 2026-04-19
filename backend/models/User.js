const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    picture: String,
    addresses: [addressSchema],
    wishlist: [{ type: String }], // Store product IDs
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

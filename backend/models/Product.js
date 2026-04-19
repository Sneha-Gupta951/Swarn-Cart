const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: String,
    price: Number,
    image: String,
    category: String,
    liked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);

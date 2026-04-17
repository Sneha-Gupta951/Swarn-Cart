import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    liked: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;

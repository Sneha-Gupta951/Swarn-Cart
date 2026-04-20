const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({ category: String }));
        const products = await Product.find({}).limit(5);
        console.log('Sample products:', JSON.stringify(products, null, 2));
        
        const categories = await Product.distinct('category');
        console.log('Distinct categories:', categories);
        
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

checkProducts();

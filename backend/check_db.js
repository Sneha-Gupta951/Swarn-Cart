const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}));
        const count = await Product.countDocuments();
        console.log('Product count:', count);
        
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

checkDB();

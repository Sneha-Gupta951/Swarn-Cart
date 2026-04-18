const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const CATEGORIES = ['Electronics', 'Clothing', 'Home Decor', 'Beauty', 'Footwear', 'Accessories', 'Grocery', 'Fitness'];
const MOCK_PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
    id: `prod-${i + 1}`, // Adding unique ID field
    name: `Premium ${CATEGORIES[i % CATEGORIES.length]} Item ${i + 1}`,
    price: Math.floor(Math.random() * 50000) + 1000,
    image: `https://loremflickr.com/600/600/${CATEGORIES[i % CATEGORIES.length].toLowerCase()}?lock=${i}`,
    category: CATEGORIES[i % CATEGORIES.length],
    liked: false
}));

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Match the unique index
  name: String,
  price: Number,
  image: String,
  category: String,
  liked: Boolean
});

// To prevent "OverwriteModelError" if model already exists in Mongoose internal cache
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const seedDB = async () => {
    try {
        console.log('⏳ Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected! Clearing existing products...');
        await Product.deleteMany({});
        console.log('🌱 Seeding 50 products...');
        await Product.insertMany(MOCK_PRODUCTS);
        console.log('✨ Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding Error:', err.message);
        process.exit(1);
    }
};

seedDB();

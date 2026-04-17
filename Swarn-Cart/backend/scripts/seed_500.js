import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const CATEGORIES = [
  { name: 'Electronics', keywords: ['tech', 'laptop', 'gadget', 'smartphone', 'camera'] },
  { name: 'Clothing', keywords: ['fashion', 'tshirt', 'jacket', 'dress', 'apparel'] },
  { name: 'Home Decor', keywords: ['furniture', 'decor', 'vase', 'lamp', 'interior'] },
  { name: 'Beauty', keywords: ['makeup', 'skincare', 'perfume', 'wellness', 'cosmetics'] },
  { name: 'Footwear', keywords: ['sneakers', 'boots', 'heels', 'shoes', 'sandals'] },
  { name: 'Accessories', keywords: ['watch', 'belt', 'wallet', 'jewelry', 'sunglasses'] },
  { name: 'Grocery', keywords: ['organic', 'food', 'fruit', 'drink', 'coffee'] },
  { name: 'Fitness', keywords: ['gym', 'yoga', 'dumbbell', 'running', 'workout'] }
];

const ADJECTIVES = ['Premium', 'Luxury', 'Evo', 'Smart', 'Elite', 'Pro', 'Classic', 'Modern', 'Essential', 'Artisan'];
const NOUNS = ['Collection', 'Series', 'X1', 'S9', 'Ultra', 'Touch', 'Gear', 'Style', 'Mate', 'Flex'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = () => Math.floor(Math.random() * 95000) + 500;

const generateProducts = (count) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    const categoryObj = getRandom(CATEGORIES);
    const keyword = getRandom(categoryObj.keywords);
    const name = `${getRandom(ADJECTIVES)} ${categoryObj.name} ${getRandom(NOUNS)} ${i}`;
    
    products.push({
      id: crypto.randomUUID(),
      name: name,
      price: getRandomPrice(),
      image: `https://loremflickr.com/600/600/${keyword}?lock=${i}`,
      category: categoryObj.name,
      liked: Math.random() > 0.8 // 20% liked by default
    });
  }
  return products;
};

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing products...');
    await Product.deleteMany();
    
    console.log('Generating 500 products...');
    const products = generateProducts(500);
    
    console.log('Seeding database...');
    await Product.insertMany(products);
    
    console.log('✅ 500 products successfully seeded to MongoDB Atlas!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();

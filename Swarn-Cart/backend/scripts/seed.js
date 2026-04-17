import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Feature from '../models/Feature.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Product.deleteMany();
        await Feature.deleteMany();

        // Load JSON data
        const productsRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));
        const featuresRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/features.json'), 'utf8'));

        // Import
        await Product.insertMany(productsRaw);
        await Feature.insertMany(featuresRaw);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

importData();

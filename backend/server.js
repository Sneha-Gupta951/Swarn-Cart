const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// --- MOCK DATA FALLBACK ---
const CATEGORIES = ['Electronics', 'Clothing', 'Home Decor', 'Beauty', 'Footwear', 'Accessories', 'Grocery', 'Fitness'];
const MOCK_PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
    id: `mock-${i + 1}`,
    name: `Premium ${CATEGORIES[i % CATEGORIES.length]} Item ${i + 1}`,
    price: Math.floor(Math.random() * 50000) + 1000,
    image: `https://loremflickr.com/600/600/${CATEGORIES[i % CATEGORIES.length].toLowerCase()}?lock=${i}`,
    category: CATEGORIES[i % CATEGORIES.length],
    liked: i % 5 === 0
}));

// Connect to Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.log('❌ MongoDB Connection Error. Serving Mock Data.');
    }
};
connectDB();

// JWT Helper
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'swarn_secret_123', { expiresIn: '30d' });
};

// --- AUTH ROUTES ---
app.post('/api/auth/google', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log(`👤 Google Login success: ${payload.email}`);
        
        // Return user info and token
        res.json({
            _id: payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            token: generateToken(payload.sub)
        });
    } catch (error) {
        console.error("❌ Google Auth Error:", error.message);
        res.status(401).json({ message: 'Invalid Google token' });
    }
});

// Routes
app.get('/api/products', (req, res) => {
    res.json(MOCK_PRODUCTS);
});

app.get('/api/categories', (req, res) => {
    const categories = CATEGORIES.map(name => ({
        name,
        badge: 'New Arrival',
        count: MOCK_PRODUCTS.filter(p => p.category === name).length
    }));
    res.json(categories);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Swarn-Cart API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Keep-alive
setInterval(() => {}, 1000 * 60 * 60);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const { protect } = require('./middleware/authMiddleware');

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

// Connect to Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.log('❌ MongoDB Connection Error:', err.message);
    }
};
connectDB();

// JWT Helper
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'swarn_secret_123', { expiresIn: '30d' });
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
    console.log('📝 Register attempt:', req.body.email);
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        console.log('✅ User registered:', email);
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            addresses: user.addresses,
            wishlist: user.wishlist,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('❌ Register error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    console.log('🔑 Login attempt:', req.body.email);
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            console.log('✅ User logged in:', email);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                addresses: user.addresses,
                wishlist: user.wishlist,
                token: generateToken(user._id)
            });
        } else {
            console.log('❌ Login failed: Invalid credentials');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('❌ Login error:', error.message);
        res.status(500).json({ message: error.message });
    }
});
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }

        const tempPassword = 'swarn' + Math.floor(Math.random() * 1000);
        user.password = tempPassword;
        await user.save();

        console.log(`🔑 Password reset for ${email}. New temp password: ${tempPassword}`);
        
        res.json({ 
            message: `Your password has been reset to: ${tempPassword}. Please log in and change it immediately.` 
        });
    } catch (error) {
        console.error('❌ Forgot password error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/auth/google', async (req, res) => {
    console.log('🌐 Google Auth attempt');
    try {
        const { token } = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log('✅ Google token verified for:', payload.email);
        
        let user = await User.findOne({ email: payload.email });
        
        if (!user) {
            user = await User.create({
                googleId: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture
            });
            console.log('✅ New Google user created');
        } else {
            user.googleId = payload.sub;
            user.name = payload.name;
            user.picture = payload.picture;
            await user.save();
            console.log('✅ Existing user linked with Google');
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            addresses: user.addresses,
            wishlist: user.wishlist,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error("❌ Google Auth Error:", error.message);
        res.status(401).json({ message: 'Invalid Google token' });
    }
});

// --- PROFILE & ADDRESS ROUTES ---
app.get('/api/profile', protect, async (req, res) => {
    res.json(req.user);
});

app.post('/api/addresses', protect, async (req, res) => {
    const { street, city, state, zipCode, country, isDefault } = req.body;
    const user = req.user;
    
    if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
    }
    
    user.addresses.push({ street, city, state, zipCode, country, isDefault });
    await user.save();
    res.status(201).json(user.addresses);
});

app.put('/api/addresses/:id', protect, async (req, res) => {
    const user = req.user;
    const addr = user.addresses.id(req.params.id);
    if (addr) {
        const { street, city, state, zipCode, country, isDefault } = req.body;
        if (isDefault) user.addresses.forEach(a => a.isDefault = false);
        
        addr.street = street || addr.street;
        addr.city = city || addr.city;
        addr.state = state || addr.state;
        addr.zipCode = zipCode || addr.zipCode;
        addr.country = country || addr.country;
        addr.isDefault = isDefault !== undefined ? isDefault : addr.isDefault;
        
        await user.save();
        res.json(user.addresses);
    } else {
        res.status(404).json({ message: 'Address not found' });
    }
});

app.delete('/api/addresses/:id', protect, async (req, res) => {
    const user = req.user;
    user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.id);
    await user.save();
    res.json(user.addresses);
});

// --- WISHLIST ROUTES ---
app.post('/api/wishlist', protect, async (req, res) => {
    const { wishlist } = req.body;
    req.user.wishlist = wishlist;
    await req.user.save();
    res.json(req.user.wishlist);
});

// --- ORDER ROUTES ---
app.post('/api/orders', protect, async (req, res) => {
    const { items, totalAmount, shippingAddress } = req.body;
    if (items && items.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }
    
    const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        shippingAddress
    });
    
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

app.get('/api/orders/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});

// --- PRODUCT ROUTES ---
app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

app.get('/api/categories', async (req, res) => {
    const products = await Product.find({});
    const categories = [...new Set(products.map(p => p.category))];
    const categoryData = categories.map(name => ({
        name,
        badge: 'Collection',
        count: products.filter(p => p.category === name).length
    }));
    res.json(categoryData);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Swarn-Cart API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


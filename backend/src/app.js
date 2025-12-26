//create server
const express = require('express');
const app = express();

// 1. CORS should come FIRST (before routes)
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// 2. Then other middleware
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 3. Then your routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const foodRoutes = require('./routes/food.routes');
app.use('/api/food', foodRoutes);

const foodPartnerRoutes = require('./routes/food-partner.routes');
app.use('/api/food-partner', foodPartnerRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
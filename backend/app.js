require('dotenv').config();
console.log("Starting app.js...");
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // ✅ Added this line

dotenv.config();

require('./config/passport');

const app = express();

app.use(express.json());

// ✅ Enable CORS for frontend requests
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Session and passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const coursesRouter = require('./routes/courses');
app.use('/api/courses', coursesRouter);

// ✅ Google OAuth Routes
const googleAuthRoutes = require('./routes/googleAuth');
app.use('/auth', googleAuthRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Login success test route
app.get('/success', (req, res) => {
  res.send('Login successful! User: ' + JSON.stringify(req.user));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
require('dotenv').config();
console.log("Starting app.js...");
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session'); // ADD THIS
const passport = require('passport');       // ADD THIS

dotenv.config();

require('./config/passport'); // ADD THIS - make sure the path is correct

const app = express();

app.use(express.json());

// --- Add session and passport middleware, must be BEFORE your routes ---
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// --- Import and use auth routes ---
const authRoutes = require('./routes/auth'); // UNCOMMENT or ADD this line
app.use('/api/auth', authRoutes);            // UNCOMMENT or ADD this line

// --- Your other routes ---
const coursesRouter = require('./routes/courses');
app.use('/api/courses', coursesRouter);

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// --- Optional: Route to check login success ---
app.get('/success', (req, res) => {
  res.send('Login successful! User: ' + JSON.stringify(req.user));
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
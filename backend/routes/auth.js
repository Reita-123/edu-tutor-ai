const passport = require('passport');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getClassroomCourses } = require('../utils/classroom');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Sign JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Google OAuth login flow
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/classroom.courses.readonly'],
}));

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to backend success page
    res.redirect('https://edu-tutor-ai-ten.vercel.app/dashboard');
  }
);

// Success route after login
router.get('/success', (req, res) => {
  res.send(`Login successful! Welcome ${req.user?.name || 'Guest'} 🎉`);
});

// 📘 Route to fetch Google Classroom courses
router.get('/google/courses', async (req, res) => {
  try {
    if (!req.user || !req.user.accessToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const courses = await getClassroomCourses(req.user.accessToken);
    res.json(courses);
  } catch (err) {
    console.error("Error fetching classroom courses:", err.message);
    res.status(500).json({ message: 'Failed to fetch courses from Google Classroom' });
  }
});

module.exports = router;
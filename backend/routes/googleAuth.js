const express = require('express');
const passport = require('passport');
const router = express.Router();

// Trigger Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle Google callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    // Redirect to your frontend after successful login
    res.redirect('http://localhost:3000/dashboard');
  }
);

module.exports = router;

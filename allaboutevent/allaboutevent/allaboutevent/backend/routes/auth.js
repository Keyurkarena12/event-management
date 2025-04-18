// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const { validateRegister } = require('../middleware/registervalidate');

// // Register Route (unchanged)
// router.post('/register', validateRegister, async (req, res) => {
//   const { name, email, password, role, createdAt } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     if (!['user', 'admin'].includes(role)) {
//       return res.status(400).json({ message: 'Invalid role' });
//     }

//     user = new User({
//       name,
//       email,
//       password, // Hashed by pre-save hook
//       role,
//       createdAt: createdAt || Date.now(),
//     });

//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '30d' }
//     );

//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // routes/auth.js
// router.post('/login', async (req, res) => {
//     const { email, password, role } = req.body;
  
//     console.log('Login attempt with:', { email, role });
  
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         console.log('User not found for email:', email);
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       const isMatch = await user.matchPassword(password);
//       if (!isMatch) {
//         console.log('Password mismatch for email:', email);
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       // Check if the requested role matches the user's actual role
//       if (user.role !== role) {
//         console.log('Role mismatch:', { requested: role, actual: user.role });
//         return res.status(403).json({ message: 'Invalid role for this account' });
//       }
  
//       const token = jwt.sign(
//         { id: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '30d' }
//       );
  
//       console.log('Login successful for:', { email, role: user.role });
//       res.json({
//         token,
//         role: user.role,
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

// module.exports = router;
//--------------------------------24 chanis----------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail'); // Import SendGrid

require('dotenv').config();

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully. Please log in.' });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    if (user.role !== role) return res.status(403).json({ message: 'Invalid role' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Forgot Password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Validate email
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send email using SendGrid
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const msg = {
      to: email,
      from: 'your-verified-sender-email@domain.com', // Replace with your verified sender email from SendGrid
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click this link to reset your password: ${resetLink}\n\nIf you did not request this, please ignore this email.`,
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p><p>If you did not request this, please ignore this email.</p>`,
    };

    try {
      await sgMail.send(msg);
      console.log('Password reset email sent successfully to:', email);
      res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error sending email via SendGrid:', error);
      if (error.response) {
        console.error('SendGrid error response:', error.response.body);
      }
      return res.status(500).json({ message: 'Error sending reset email', error: error.message });
    }
  } catch (err) {
    console.error('Error in forgot-password:', err);
    res.status(500).json({ message: 'Error processing forgot password request', error: err.message });
  }
});

// Reset Password route
router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  }
   catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
});

module.exports = router;
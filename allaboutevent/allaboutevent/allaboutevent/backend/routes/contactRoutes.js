// const express = require('express');
// const router = express.Router();
// const Contact = require('../models/Contact');

// // POST - Save contact message
// router.post('/api/insert', async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     // Validation
//     if (!name || !email || !message) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Name, email, and message are required' 
//       });
//     }

//     // Create new contact
//     const newContact = new Contact({
//       name,
//       email,
//       phone,
//       message
//     });

//     // Save to database
//     const savedContact = await newContact.save();

//     res.status(201).json({
//       success: true,
//       message: 'Message saved successfully',
//       data: savedContact
//     });
//   } catch (error) {
//     console.error('Error saving contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// // GET - Retrieve all contacts (optional, for admin use)
// router.get('/api/contacts', async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       data: contacts
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST route to insert a new contact message
router.post('/insert', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      phone: phone || '', // Phone is optional
      message,
    });

    // Save to database
    const savedContact = await contact.save();
    res.status(201).json({ success: true, data: savedContact, message: 'Message saved successfully' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ success: false, message: 'Error saving message', error: err.message });
  }
});

// Optional: GET route to retrieve all contacts (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching contacts', error: err.message });
  }
});

module.exports = router;
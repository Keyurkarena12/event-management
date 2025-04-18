


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const path = require('path');
const Service = require('./models/Service');
const User = require('./models/user');
const Event = require('./models/event');
const contactRoutes = require('./routes/contactRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const authMiddleware = require('./middleware/auth');
const notificationRoutes = require('./routes/notification');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './Uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
app.use('/api/auth', authRoutes);
app.use('/message/api', contactRoutes);

// Service Routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching services', error: err.message });
  }
});

app.post('/api/services', upload.single('image'), async (req, res) => {
  try {
    const service = new Service({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating || 0,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error creating service', error: err.message });
  }
});

app.put('/api/services/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating || 0,
    };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error updating service', error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting service', error: err.message });
  }
});

// User Count
app.get('/api/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching user count', error: err.message });
  }
});

// Event Count
app.get('/api/events/count', async (req, res) => {
  try {
    const count = await Event.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching event count', error: err.message });
  }
});

// Service Count
app.get('/api/services/count', async (req, res) => {
  try {
    const count = await Service.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching service count', error: err.message });
  }
});

// Booking Routes
app.post('/api/bookings', async (req, res) => {
  try {
    const { serviceId, userId, name, email, eventDate, notes, status } = req.body;

    // Validate input
    if (!serviceId || !userId || !name || !email || !eventDate) {
      return res.status(400).json({ success: false, message: 'Service ID, User ID, Name, Email, and Event Date are required' });
    }

    // Verify service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    // Create new booking
    const booking = new Event({
      serviceId,
      userId,
      name,
      email,
      eventDate: new Date(eventDate),
      notes: notes || '',
      status: status || 'Pending',
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating booking', error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Event.find()
      .populate('serviceId', 'title')
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching bookings', error: err.message });
  }
});

app.put('/api/bookings/:id/confirm', async (req, res) => {
  try {
    const booking = await Event.findByIdAndUpdate(
      req.params.id,
      { status: 'Confirmed' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error confirming booking', error: err.message });
  }
});

app.use('/api/notifications', notificationRoutes);
app.use('/', settingsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//-------------------------------------------------------------------------------------------------------

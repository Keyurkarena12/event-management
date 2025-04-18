
//////////////////////////////16-4-25--------------------------------------------------------------------------------------

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  userId: {
    type: String, // Change to ObjectId and ref: 'User' if using proper user authentication
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);



// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   serviceId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Service',
//     required: true,
//   },
//   userId: {
//     type: String, // Change to ObjectId and ref: 'User' if using proper user authentication
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   eventDate: {
//     type: Date,
//     required: true,
//   },
//   notes: {
//     type: String,
//     default: '',
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Confirmed', 'Cancelled'],
//     default: 'Pending',
//   },
//   paymentIntentId: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Event', eventSchema);
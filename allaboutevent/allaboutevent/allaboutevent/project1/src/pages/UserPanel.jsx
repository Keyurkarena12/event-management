// import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

// function UserPanel() {
//   const upcomingEvents = [
//     {
//       id: 1,
//       title: 'Birthday Celebration',
//       date: '2024-04-15',
//       time: '18:00',
//       location: 'Golden Hall',
//       status: 'Confirmed'
//     },
//     {
//       id: 2,
//       title: 'Corporate Meeting',
//       date: '2024-04-20',
//       time: '14:00',
//       location: 'Business Center',
//       status: 'Pending'
//     }
//   ];

//   const bookingHistory = [
//     {
//       id: 1,
//       title: 'Wedding Anniversary',
//       date: '2024-03-10',
//       amount: '$3,500',
//       status: 'Completed'
//     },
//     {
//       id: 2,
//       title: 'Product Launch',
//       date: '2024-02-25',
//       amount: '$2,800',
//       status: 'Completed'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-6">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
//           <p className="text-gray-600">Welcome back, User!</p>
//         </div>

//         <div className="grid grid-cols-3 gap-6 mb-8">
//           <button className="card flex items-center space-x-4">
//             <Calendar className="h-8 w-8 text-indigo-600" />
//             <div>
//               <h3 className="font-semibold text-gray-900">Book Event</h3>
//               <p className="text-sm text-gray-500">Create a new booking</p>
//             </div>
//           </button>

//           <button className="card flex items-center space-x-4">
//             <CreditCard className="h-8 w-8 text-indigo-600" />
//             <div>
//               <h3 className="font-semibold text-gray-900">Payment History</h3>
//               <p className="text-sm text-gray-500">View your transactions</p>
//             </div>
//           </button>

//           <button className="card flex items-center space-x-4">
//             <Clock className="h-8 w-8 text-indigo-600" />
//             <div>
//               <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
//               <p className="text-sm text-gray-500">Check your schedule</p>
//             </div>
//           </button>
//         </div>

//         <div className="card mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
//           {upcomingEvents.map((event) => (
//             <div key={event.id} className="p-6 border-b">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
//                   <div className="mt-2 space-y-2">
//                     <div className="flex items-center text-gray-500">
//                       <Calendar className="h-5 w-5 mr-2" />
//                       <span>{event.date}</span>
//                     </div>
//                     <div className="flex items-center text-gray-500">
//                       <Clock className="h-5 w-5 mr-2" />
//                       <span>{event.time}</span>
//                     </div>
//                     <div className="flex items-center text-gray-500">
//                       <MapPin className="h-5 w-5 mr-2" />
//                       <span>{event.location}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <span className={`badge ${
//                   event.status === 'Confirmed' ? 'badge-success' : 'badge-warning'
//                 }`}>
//                   {event.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="card">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking History</h2>
//           <div className="table-container">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Event</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookingHistory.map((booking) => (
//                   <tr key={booking.id}>
//                     <td>{booking.title}</td>
//                     <td>{booking.date}</td>
//                     <td>{booking.amount}</td>
//                     <td>
//                       <span className="badge badge-success">{booking.status}</span>
//                     </td>
//                     <td>
//                       <button className="btn-primary">View Details</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserPanel;

import { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard, Plus } from 'lucide-react';

function UserPanel() {
  // Simulated shared state between admin and user
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Birthday Celebration',
      date: '2024-04-15',
      time: '18:00',
      location: 'Golden Hall',
      status: 'Confirmed',
      details: 'A grand celebration with 50 guests'
    },
    {
      id: 2,
      title: 'Corporate Meeting',
      date: '2024-04-20',
      time: '14:00',
      location: 'Business Center',
      status: 'Pending',
      details: 'Quarterly business review meeting'
    }
  ]);

  const [bookingHistory] = useState([
    {
      id: 1,
      title: 'Wedding Anniversary',
      date: '2024-03-10',
      amount: '$3,500',
      status: 'Completed',
      details: '25th anniversary celebration'
    },
    {
      id: 2,
      title: 'Product Launch',
      date: '2024-02-25',
      amount: '$2,800',
      status: 'Completed',
      details: 'New tech product unveiling'
    }
  ]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newBooking, setNewBooking] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    details: ''
  });

  // Handle new booking creation
  const handleCreateBooking = (e) => {
    e.preventDefault();
    const booking = {
      id: upcomingEvents.length + 1,
      ...newBooking,
      status: 'Pending' // Default status for new bookings
    };
    setUpcomingEvents([...upcomingEvents, booking]);
    setIsBookingModalOpen(false);
    setNewBooking({ title: '', date: '', time: '', location: '', details: '' });

    // In real app, this would be sent to backend and visible to admin
  };

  // Handle viewing details
  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, User!</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="card flex items-center space-x-4 hover:bg-gray-100 transition"
          >
            <Calendar className="h-8 w-8 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Book Event</h3>
              <p className="text-sm text-gray-500">Create a new booking</p>
            </div>
          </button>

          <button className="card flex items-center space-x-4 hover:bg-gray-100 transition">
            <CreditCard className="h-8 w-8 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Payment History</h3>
              <p className="text-sm text-gray-500">View your transactions</p>
            </div>
          </button>

          <button className="card flex items-center space-x-4 hover:bg-gray-100 transition">
            <Clock className="h-8 w-8 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
              <p className="text-sm text-gray-500">Check your schedule</p>
            </div>
          </button>
        </div>

        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-6 border-b hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`badge ${
                    event.status === 'Confirmed' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {event.status}
                  </span>
                  <button 
                    onClick={() => handleViewDetails(event)}
                    className="btn-primary text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking History</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.title}</td>
                    <td>{booking.date}</td>
                    <td>{booking.amount}</td>
                    <td>
                      <span className="badge badge-success">{booking.status}</span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleViewDetails(booking)}
                        className="btn-primary"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Booking Modal */}
        {isBookingModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
              <form onSubmit={handleCreateBooking}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={newBooking.title}
                    onChange={(e) => setNewBooking({ ...newBooking, title: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Time</label>
                  <input
                    type="time"
                    value={newBooking.time}
                    onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={newBooking.location}
                    onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Details</label>
                  <textarea
                    value={newBooking.details}
                    onChange={(e) => setNewBooking({ ...newBooking, details: e.target.value })}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary flex-1">
                    Submit Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="btn bg-gray-500 hover:bg-gray-600 text-white flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {isDetailsModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">{selectedEvent.title}</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{selectedEvent.date}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.amount && (
                  <div className="flex items-center text-gray-500">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span>{selectedEvent.amount}</span>
                  </div>
                )}
                <div className="text-gray-500">
                  <p className="font-medium">Status:</p>
                  <span className={`badge ${
                    selectedEvent.status === 'Confirmed' ? 'badge-success' : 
                    selectedEvent.status === 'Pending' ? 'badge-warning' : 'badge-success'
                  }`}>
                    {selectedEvent.status}
                  </span>
                </div>
                {selectedEvent.details && (
                  <div className="text-gray-500">
                    <p className="font-medium">Details:</p>
                    <p>{selectedEvent.details}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="btn bg-gray-500 hover:bg-gray-600 text-white w-full mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPanel;
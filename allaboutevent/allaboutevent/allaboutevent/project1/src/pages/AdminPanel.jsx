

// export default AdminPanel;
// import { useState, useEffect } from 'react';
// import { Calendar, Users, Settings, BarChart, FileText, Bell, Plus } from 'lucide-react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function AdminPanel() {
//   const [stats, setStats] = useState([
//     { title: 'Total Events', value: '...', icon: Calendar },
//     { title: 'Total Users', value: '...', icon: Users },
//     { title: 'Total Services', value: '...', icon: FileText },
//     { title: 'New Bookings', value: '...', icon: FileText },
//   ]);

//   const [bookings, setBookings] = useState([]);
//   const [services, setServices] = useState([]);
//   const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const [serviceFormData, setServiceFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     rating: '',
//     image: null,
//   });
//   const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
//   const [settings, setSettings] = useState({
//     theme: 'light',
//     language: 'en',
//   });
//   const [error, setError] = useState(null);
//   // New state for notifications
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const API_BASE_URL = 'http://localhost:8000';

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log('Fetching data...');

//         const serviceRes = await axios.get(`${API_BASE_URL}/api/services`);
//         console.log('Services response:', serviceRes.data);
//         setServices(serviceRes.data || []);

//         const userRes = await axios.get(`${API_BASE_URL}/api/users/count`);
//         console.log('User count response:', userRes.data);
//         const userCount = userRes.data.count !== undefined ? userRes.data.count : 0;

//         const eventRes = await axios.get(`${API_BASE_URL}/api/events/count`);
//         console.log('Event count response:', eventRes.data);
//         const eventCount = eventRes.data.count !== undefined ? eventRes.data.count : 0;

//         const serviceCountRes = await axios.get(`${API_BASE_URL}/api/services/count`);
//         console.log('Service count response:', serviceCountRes.data);
//         const serviceCount = serviceCountRes.data.count !== undefined ? serviceCountRes.data.count : 0;

//         const bookingRes = await axios.get(`${API_BASE_URL}/api/bookings`);
//         console.log('Bookings response:', bookingRes.data);
//         const bookingsData = Array.isArray(bookingRes.data) ? bookingRes.data : [];
//         setBookings(bookingsData);

//         // Generate notifications based on pending bookings
//         const newNotifications = bookingsData
//           .filter((b) => b.status === 'Pending')
//           .map((b) => ({
//             id: b._id,
//             message: `New booking for ${b.serviceId?.title || 'Unknown Service'} by ${b.userId?.name || 'Unknown User'}`,
//             date: b.date ? new Date(b.date).toLocaleString() : 'N/A',
//           }));
//         setNotifications(newNotifications);

//         const newBookingsCount = bookingsData.filter((b) => b.status === 'Pending').length;

//         const updatedStats = stats.map((stat) => {
//           if (stat.title === 'Total Users') return { ...stat, value: userCount.toString() };
//           if (stat.title === 'Total Events') return { ...stat, value: eventCount.toString() };
//           if (stat.title === 'Total Services') return { ...stat, value: serviceCount.toString() };
//           if (stat.title === 'New Bookings') return { ...stat, value: newBookingsCount.toString() };
//           return stat;
//         });
//         setStats(updatedStats);
//         setError(null);
//       } catch (err) {
//         console.log('Error fetching dashboard data:', err.response?.data || err.message);
//         setError('Failed to load dashboard data. Check console for details or ensure the backend is running.');
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle notification click
//   const handleNotificationClick = () => {
//     setIsNotificationOpen(!isNotificationOpen);
//   };

//   // Clear a notification (optional feature)
//   const handleClearNotification = (id) => {
//     setNotifications(notifications.filter((n) => n.id !== id));
//   };

//   // Service CRUD Operations
//   const handleServiceCreate = () => {
//     setSelectedService(null);
//     setServiceFormData({ title: '', description: '', price: '', rating: '', image: null });
//     setIsServiceModalOpen(true);
//   };

//   const handleServiceEdit = (service) => {
//     setSelectedService(service);
//     setServiceFormData({ ...service, image: null });
//     setIsServiceModalOpen(true);
//   };

//   const handleServiceDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this service?')) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/services/${id}`);
//         setServices(services.filter((service) => service._id !== id));
//       } catch (err) {
//         console.error('Error deleting service:', err);
//       }
//     }
//   };

//   const handleServiceSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append('title', serviceFormData.title);
//     formDataToSend.append('description', serviceFormData.description);
//     formDataToSend.append('price', serviceFormData.price);
//     formDataToSend.append('rating', serviceFormData.rating);
//     if (serviceFormData.image) {
//       formDataToSend.append('image', serviceFormData.image);
//     }

//     try {
//       if (selectedService) {
//         const response = await axios.put(
//           `${API_BASE_URL}/api/services/${selectedService._id}`,
//           formDataToSend,
//           { headers: { 'Content-Type': 'multipart/form-data' } }
//         );
//         setServices(services.map((service) =>
//           service._id === selectedService._id ? response.data : service
//         ));
//       } else {
//         const response = await axios.post(
//           `${API_BASE_URL}/api/services`,
//           formDataToSend,
//           { headers: { 'Content-Type': 'multipart/form-data' } }
//         );
//         setServices([...services, response.data]);
//       }
//       setIsServiceModalOpen(false);
//       setServiceFormData({ title: '', description: '', price: '', rating: '', image: null });
//     } catch (err) {
//       console.error('Error submitting service:', err.response?.data || err.message);
//     }
//   };

//   // Booking Confirmation
//   const handleBookingConfirm = async (id) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/api/bookings/${id}/confirm`);
//       setBookings(bookings.map((booking) =>
//         booking._id === id ? response.data : booking
//       ));
//       setStats(stats.map((stat) =>
//         stat.title === 'New Bookings'
//           ? { ...stat, value: (parseInt(stat.value) - 1).toString() }
//           : stat
//       ));
//       // Remove notification for confirmed booking
//       setNotifications(notifications.filter((n) => n.id !== id));
//     } catch (err) {
//       console.error('Error confirming booking:', err);
//     }
//   };

//   // Settings Submit
//   const handleSettingsSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_BASE_URL}/api/settings`, settings);
//       setIsSettingsModalOpen(false);
//     } catch (err) {
//       console.error('Error saving settings:', err);
//       setError('Failed to save settings. Check console for details.');
//     }
//   };

//   // Fallback UI for errors or loading
//   if (error) {
//     return (
//       <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-6 flex items-center justify-center`}>
//         <div className="text-lg">{error}</div>
//       </div>
//     );
//   }

//   if (stats.some((stat) => stat.value === '...') && bookings.length === 0 && services.length === 0) {
//     return (
//       <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-6 flex items-center justify-center`}>
//         <div className="text-lg">Loading dashboard data...</div>
//       </div>
//     );
//   }

//   // Prepare chart data
//   const chartData = {
//     labels: ['Pending', 'Confirmed'],
//     datasets: [
//       {
//         label: 'Number of Bookings',
//         data: [
//           bookings.filter((b) => b.status === 'Pending').length,
//           bookings.filter((b) => b.status === 'Confirmed').length,
//         ],
//         backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
//         borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: {
//         display: true,
//         text: 'Bookings by Status',
//       },
//     },
//   };

//   return (
//     <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 className={`btn ${settings.theme === 'dark' ? 'text-white border-white hover:bg-gray-700' : 'text-gray-900 border-gray-900 hover:bg-gray-200'}`}
//                 onClick={handleNotificationClick}
//               >
//                 <Bell className="h-6 w-6" />
//                 {notifications.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>
//               {isNotificationOpen && (
//                 <div
//                   className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-10 ${
//                     settings.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
//                   }`}
//                 >
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold mb-2">Notifications</h3>
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div
//                           key={notification.id}
//                           className={`p-2 mb-2 rounded ${
//                             settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
//                           } flex justify-between items-center`}
//                         >
//                           <div>
//                             <p className="text-sm">{notification.message}</p>
//                             <p className="text-xs opacity-75">{notification.date}</p>
//                           </div>
//                           <button
//                             onClick={() => handleClearNotification(notification.id)}
//                             className="text-red-500 hover:text-red-700 text-sm"
//                           >
//                             Clear
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm">No new notifications</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <button
//               className={`btn ${settings.theme === 'dark' ? 'text-white border-white hover:bg-gray-700' : 'text-gray-900 border-gray-900 hover:bg-gray-200'}`}
//               onClick={() => setIsSettingsModalOpen(true)}
//             >
//               <Settings className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
//               <div className="flex items-center justify-between p-4">
//                 <div>
//                   <p className={`text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>{stat.title}</p>
//                   <p className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
//                 </div>
//                 <stat.icon className={`h-8 w-8 ${settings.theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* User Bookings Section */}
//         <div className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
//           <div className="flex items-center justify-between mb-4 p-4">
//             <h2 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Bookings</h2>
//           </div>
//           <div className="table-container">
//             <table className={`table ${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
//               <thead>
//                 <tr>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Event</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Client</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Date</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Status</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.length > 0 ? (
//                   bookings.map((booking) => (
//                     <tr key={booking._id || Math.random()} className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
//                       <td className="p-2">{booking.serviceId?.title || 'N/A'}</td>
//                       <td className="p-2">{booking.userId?.name || 'N/A'}</td>
//                       <td className="p-2">{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</td>
//                       <td className="p-2">
//                         <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'} ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//                           {booking.status || 'Pending'}
//                         </span>
//                       </td>
//                       <td className="p-2">
//                         {booking.status === 'Pending' && booking._id ? (
//                           <button
//                             onClick={() => handleBookingConfirm(booking._id)}
//                             className={`btn ${settings.theme === 'dark' ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} text-sm`}
//                           >
//                             Confirm
//                           </button>
//                         ) : (
//                           <span className={settings.theme === 'dark' ? 'text-white' : 'text-gray-500'}>Confirmed</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
//                     <td colSpan="5" className="p-2 text-center">No bookings available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Services Section */}
//         <div className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
//           <div className="flex items-center justify-between mb-4 p-4">
//             <h2 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Services</h2>
//             <button onClick={handleServiceCreate} className={`btn-primary ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} flex items-center gap-2`}>
//               <Plus className="h-5 w-5" /> Add Service
//             </button>
//           </div>
//           <div className="table-container">
//             <table className={`table ${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
//               <thead>
//                 <tr>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Image</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Title</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Description</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Price</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Rating</th>
//                   <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {services.length > 0 ? (
//                   services.map((service) => (
//                     <tr key={service._id || Math.random()} className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
//                       <td className="p-2">
//                         {service.image ? (
//                           <img src={`${API_BASE_URL}${service.image}`} alt={service.title} className="h-10 w-10 object-cover rounded" />
//                         ) : (
//                           <span className={settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}>No Image</span>
//                         )}
//                       </td>
//                       <td className="p-2">{service.title || 'N/A'}</td>
//                       <td className="p-2">{service.description || 'N/A'}</td>
//                       <td className="p-2">${service.price || 'N/A'}</td>
//                       <td className="p-2">{service.rating || 'N/A'}</td>
//                       <td className="p-2">
//                         <div className="flex gap-2">
//                           <button onClick={() => handleServiceEdit(service)} className={`btn-primary ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} text-sm`}>Edit</button>
//                           <button onClick={() => handleServiceDelete(service._id)} className={`btn ${settings.theme === 'dark' ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} text-sm`}>Delete</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
//                     <td colSpan="6" className="p-2 text-center">No services available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Service Modal */}
//         {isServiceModalOpen && (
//           <div className={`fixed inset-0 ${settings.theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-gray-600 bg-opacity-50'} flex items-center justify-center`}>
//             <div className={`bg-${settings.theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg w-96`}>
//               <h3 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>{selectedService ? 'Edit Service' : 'Add Service'}</h3>
//               <form onSubmit={handleServiceSubmit}>
//                 <div className="mb-4">
//                   <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Title</label>
//                   <input
//                     type="text"
//                     value={serviceFormData.title}
//                     onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
//                     className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Description</label>
//                   <textarea
//                     value={serviceFormData.description}
//                     onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
//                     className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Price</label>
//                   <input
//                     type="number"
//                     value={serviceFormData.price}
//                     onChange={(e) => setServiceFormData({ ...serviceFormData, price: e.target.value })}
//                     className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Rating</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     min="0"
//                     max="5"
//                     value={serviceFormData.rating}
//                     onChange={(e) => setServiceFormData({ ...serviceFormData, rating: e.target.value })}
//                     className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.files[0] })}
//                     className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//                     required={!selectedService}
//                   />
//                   {selectedService && serviceFormData.image && (
//                     <p className={`text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-500'} mt-2`}>New image selected</p>
//                   )}
//                 </div>
//                 <div className="flex gap-2">
//                   <button type="submit" className={`btn-primary w-1/2 ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>{selectedService ? 'Update' : 'Add'} Service</button>
//                   <button type="button" onClick={() => setIsServiceModalOpen(false)} className={`btn border w-1/2 ${settings.theme === 'dark' ? 'text-white border-gray-400 hover:bg-gray-700' : 'text-gray-900 border-gray-300 hover:bg-gray-200'}`}>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Settings Modal */}
//         {isSettingsModalOpen && (
//           <div className={`fixed inset-0 ${settings.theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-gray-600 bg-opacity-50'} flex items-center justify-center`}>
//             <div className={`bg-${settings.theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg w-96`}>
//               <h3 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Settings</h3>
//               <form onSubmit={handleSettingsSubmit}>
//                 <div className="mb-4">
//                   <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Theme</label>
//                   <select
//                     value={settings.theme}
//                     onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
//                     className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//                   >
//                     <option value="light">Light</option>
//                     <option value="dark">Dark</option>
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Language</label>
//                   <select
//                     value={settings.language}
//                     onChange={(e) => setSettings({ ...settings, language: e.target.value })}
//                     className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//                   >
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                   </select>
//                 </div>
//                 <div className="flex gap-2">
//                   <button type="submit" className={`btn-primary w-1/2 ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>Save Settings</button>
//                   <button
//                     type="button"
//                     onClick={() => setIsSettingsModalOpen(false)}
//                     className={`btn border w-1/2 ${settings.theme === 'dark' ? 'text-white border-gray-400 hover:bg-gray-700' : 'text-gray-900 border-gray-300 hover:bg-gray-200'}`}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Analytics Section */}
//         <div className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="flex items-center justify-between mb-4 p-4">
//             <h2 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Bookings Analytics</h2>
//             <BarChart className={`h-6 w-6 ${settings.theme === 'dark' ? 'text-white' : 'text-gray-500'}`} />
//           </div>
//           <div className="h-64">
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;

import { useState, useEffect } from 'react';
import { Calendar, Users, Settings, BarChart, FileText, Bell, Plus } from 'lucide-react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminPanel() {
  const [stats, setStats] = useState([
    { title: 'Total Events', value: '...', icon: Calendar },
    { title: 'Total Users', value: '...', icon: Users },
    { title: 'Total Services', value: '...', icon: FileText },
    { title: 'New Bookings', value: '...', icon: FileText },
  ]);

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    price: '',
    rating: '',
    image: null,
  });
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
  });
  const [error, setError] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');

        const serviceRes = await axios.get(`${API_BASE_URL}/api/services`);
        console.log('Services response:', serviceRes.data);
        setServices(serviceRes.data || []);

        const userRes = await axios.get(`${API_BASE_URL}/api/users/count`);
        console.log('User count response:', userRes.data);
        const userCount = userRes.data.count !== undefined ? userRes.data.count : 0;

        const eventRes = await axios.get(`${API_BASE_URL}/api/events/count`);
        console.log('Event count response:', eventRes.data);
        const eventCount = eventRes.data.count !== undefined ? eventRes.data.count : 0;

        const serviceCountRes = await axios.get(`${API_BASE_URL}/api/services/count`);
        console.log('Service count response:', serviceCountRes.data);
        const serviceCount = serviceCountRes.data.count !== undefined ? serviceCountRes.data.count : 0;

        const bookingRes = await axios.get(`${API_BASE_URL}/api/bookings`);
        console.log('Bookings response:', bookingRes.data);
        const bookingsData = Array.isArray(bookingRes.data) ? bookingRes.data : [];
        setBookings(bookingsData);

        // Generate notifications based on pending bookings
        const newNotifications = bookingsData
          .filter((b) => b.status === 'Pending')
          .map((b) => ({
            id: b._id,
            message: `New booking for ${b.serviceId?.title || 'Unknown Service'} by ${b.name || 'Unknown User'}`,
            date: b.eventDate ? new Date(b.eventDate).toLocaleString() : 'N/A',
          }));
        setNotifications(newNotifications);

        const newBookingsCount = bookingsData.filter((b) => b.status === 'Pending').length;

        const updatedStats = stats.map((stat) => {
          if (stat.title === 'Total Users') return { ...stat, value: userCount.toString() };
          if (stat.title === 'Total Events') return { ...stat, value: eventCount.toString() };
          if (stat.title === 'Total Services') return { ...stat, value: serviceCount.toString() };
          if (stat.title === 'New Bookings') return { ...stat, value: newBookingsCount.toString() };
          return stat;
        });
        setStats(updatedStats);
        setError(null);
      } catch (err) {
        console.log('Error fetching dashboard data:', err.response?.data || err.message);
        setError('Failed to load dashboard data. Check console for details or ensure the backend is running.');
      }
    };

    fetchData();
  }, []);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleClearNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleServiceCreate = () => {
    setSelectedService(null);
    setServiceFormData({ title: '', description: '', price: '', rating: '', image: null });
    setIsServiceModalOpen(true);
  };

  const handleServiceEdit = (service) => {
    setSelectedService(service);
    setServiceFormData({ ...service, image: null });
    setIsServiceModalOpen(true);
  };

  const handleServiceDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/services/${id}`);
        setServices(services.filter((service) => service._id !== id));
      } catch (err) {
        console.error('Error deleting service:', err);
      }
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', serviceFormData.title);
    formDataToSend.append('description', serviceFormData.description);
    formDataToSend.append('price', serviceFormData.price);
    formDataToSend.append('rating', serviceFormData.rating);
    if (serviceFormData.image) {
      formDataToSend.append('image', serviceFormData.image);
    }

    try {
      if (selectedService) {
        const response = await axios.put(
          `${API_BASE_URL}/api/services/${selectedService._id}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setServices(services.map((service) =>
          service._id === selectedService._id ? response.data : service
        ));
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/api/services`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setServices([...services, response.data]);
      }
      setIsServiceModalOpen(false);
      setServiceFormData({ title: '', description: '', price: '', rating: '', image: null });
    } catch (err) {
      console.error('Error submitting service:', err.response?.data || err.message);
    }
  };

  const handleBookingConfirm = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/bookings/${id}/confirm`);
      setBookings(bookings.map((booking) =>
        booking._id === id ? response.data : booking
      ));
      setStats(stats.map((stat) =>
        stat.title === 'New Bookings'
          ? { ...stat, value: (parseInt(stat.value) - 1).toString() }
          : stat
      ));
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Error confirming booking:', err);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/settings`, settings);
      setIsSettingsModalOpen(false);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings. Check console for details.');
    }
  };

  if (error) {
    return (
      <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-6 flex items-center justify-center`}>
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  if (stats.some((stat) => stat.value === '...') && bookings.length === 0 && services.length === 0) {
    return (
      <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-6 flex items-center justify-center`}>
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  const chartData = {
    labels: ['Pending', 'Confirmed'],
    datasets: [
      {
        label: 'Number of Bookings',
        data: [
          bookings.filter((b) => b.status === 'Pending').length,
          bookings.filter((b) => b.status === 'Confirmed').length,
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Bookings by Status',
      },
    },
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className={`btn ${settings.theme === 'dark' ? 'text-white border-white hover:bg-gray-700' : 'text-gray-900 border-gray-900 hover:bg-gray-200'}`}
                onClick={handleNotificationClick}
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {isNotificationOpen && (
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-10 ${
                    settings.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                  }`}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-2 mb-2 rounded ${
                            settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                          } flex justify-between items-center`}
                        >
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs opacity-75">{notification.date}</p>
                          </div>
                          <button
                            onClick={() => handleClearNotification(notification.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Clear
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              className={`btn ${settings.theme === 'dark' ? 'text-white border-white hover:bg-gray-700' : 'text-gray-900 border-gray-900 hover:bg-gray-200'}`}
              onClick={() => setIsSettingsModalOpen(true)}
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className={`text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>{stat.title}</p>
                  <p className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${settings.theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* User Bookings Section */}
        <div className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <div className="flex items-center justify-between mb-4 p-4">
            <h2 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Bookings</h2>
          </div>
          <div className="table-container">
            <table className={`table ${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <thead>
                <tr>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Event</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Client</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Email</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Event Date</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Notes</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Status</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id || Math.random()} className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
                      <td className="p-2">{booking.serviceId?.title || 'N/A'}</td>
                      <td className="p-2">{booking.name || 'N/A'}</td>
                      <td className="p-2">{booking.email || 'N/A'}</td>
                      <td className="p-2">{booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="p-2">{booking.notes || 'N/A'}</td>
                      <td className="p-2">
                        <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'} ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {booking.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-2">
                        {booking.status === 'Pending' && booking._id ? (
                          <button
                            onClick={() => handleBookingConfirm(booking._id)}
                            className={`btn ${settings.theme === 'dark' ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} text-sm`}
                          >
                            Confirm
                          </button>
                        ) : (
                          <span className={settings.theme === 'dark' ? 'text-white' : 'text-gray-500'}>Confirmed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
                    <td colSpan="7" className="p-2 text-center">No bookings available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Services Section */}
        <div className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <div className="flex items-center justify-between mb-4 p-4">
            <h2 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Services</h2>
            <button onClick={handleServiceCreate} className={`btn-primary ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} flex items-center gap-2`}>
              <Plus className="h-5 w-5" /> Add Service
            </button>
          </div>
          <div className="table-container">
            <table className={`table ${settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <thead>
                <tr>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Image</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Title</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Description</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Price</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Rating</th>
                  <th className={`p-2 ${settings.theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service._id || Math.random()} className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
                      <td className="p-2">
                        {service.image ? (
                          <img src={`${API_BASE_URL}${service.image}`} alt={service.title} className="h-10 w-10 object-cover rounded" />
                        ) : (
                          <span className={settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}>No Image</span>
                        )}
                      </td>
                      <td className="p-2">{service.title || 'N/A'}</td>
                      <td className="p-2">{service.description || 'N/A'}</td>
                      <td className="p-2">${service.price || 'N/A'}</td>
                      <td className="p-2">{service.rating || 'N/A'}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button onClick={() => handleServiceEdit(service)} className={`btn-primary ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} text-sm`}>Edit</button>
                          <button onClick={() => handleServiceDelete(service._id)} className={`btn ${settings.theme === 'dark' ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} text-sm`}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
                    <td colSpan="6" className="p-2 text-center">No services available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Modal */}
        {isServiceModalOpen && (
          <div className={`fixed inset-0 ${settings.theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-gray-600 bg-opacity-50'} flex items-center justify-center`}>
            <div className={`bg-${settings.theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg w-96`}>
              <h3 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>{selectedService ? 'Edit Service' : 'Add Service'}</h3>
              <form onSubmit={handleServiceSubmit}>
                <div className="mb-4">
                  <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Title</label>
                  <input
                    type="text"
                    value={serviceFormData.title}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                    className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Description</label>
                  <textarea
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Price</label>
                  <input
                    type="number"
                    value={serviceFormData.price}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, price: e.target.value })}
                    className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={serviceFormData.rating}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, rating: e.target.value })}
                    className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.files[0] })}
                    className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    required={!selectedService}
                  />
                  {selectedService && serviceFormData.image && (
                    <p className={`text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-500'} mt-2`}>New image selected</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button type="submit" className={`btn-primary w-1/2 ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>{selectedService ? 'Update' : 'Add'} Service</button>
                  <button type="button" onClick={() => setIsServiceModalOpen(false)} className={`btn border w-1/2 ${settings.theme === 'dark' ? 'text-white border-gray-400 hover:bg-gray-700' : 'text-gray-900 border-gray-300 hover:bg-gray-200'}`}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {isSettingsModalOpen && (
          <div className={`fixed inset-0 ${settings.theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-gray-600 bg-opacity-50'} flex items-center justify-center`}>
            <div className={`bg-${settings.theme === 'dark' ? 'gray-800' : 'white'} p-6 rounded-lg w-96`}>
              <h3 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Settings</h3>
              <form onSubmit={handleSettingsSubmit}>
                <div className="mb-4">
                  <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                    className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className={`block text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-1`}>Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className={`w-full p-2 border rounded ${settings.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className={`btn-primary w-1/2 ${settings.theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>Save Settings</button>
                  <button
                    type="button"
                    onClick={() => setIsSettingsModalOpen(false)}
                    className={`btn border w-1/2 ${settings.theme === 'dark' ? 'text-white border-gray-400 hover:bg-gray-700' : 'text-gray-900 border-gray-300 hover:bg-gray-200'}`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Analytics Section */}
        <div className={`card ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4 p-4">
            <h2 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Bookings Analytics</h2>
            <BarChart className={`h-6 w-6 ${settings.theme === 'dark' ? 'text-white' : 'text-gray-500'}`} />
          </div>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
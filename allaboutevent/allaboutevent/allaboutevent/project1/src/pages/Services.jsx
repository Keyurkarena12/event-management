

//-----------------------------------------------------------------16-4-25--------------------------------------------
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    notes: '',
  });
  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(response.data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services.');
      }
    };
    fetchServices();
  }, []);

  const handleBookNow = (serviceId) => {
    setSelectedServiceId(serviceId);
    setBookingFormData({ name: '', email: '', eventDate: '', notes: '' });
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userId = 'guest'; // Placeholder; implement proper auth in production
      const response = await axios.post(`${API_BASE_URL}/api/bookings`, {
        serviceId: selectedServiceId,
        userId,
        name: bookingFormData.name,
        email: bookingFormData.email,
        eventDate: bookingFormData.eventDate,
        notes: bookingFormData.notes,
        status: 'Pending',
      });
      setSuccess(`Booking for service created successfully!`);
      setIsBookingModalOpen(false);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We offer a comprehensive range of event planning services to make your special occasions truly memorable.
        </p>
      </div>

      {/* Feedback Messages */}
      {error && <p className="text-center text-red-600">{error}</p>}
     {success && <p className="text-center text-green-600">{success}</p>}

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        {services.length === 0 ? (
          <p className="text-center text-gray-600">No services available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${API_BASE_URL}${service.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {renderStars(service.rating)}
                      <span className="ml-2 text-gray-600">({service.rating})</span>
                    </div>
                    <span className="text-2xl font-bold text-indigo-600">${service.price}</span>
                  </div>
                  <button
                    onClick={() => handleBookNow(service._id)}
                    disabled={loading}
                    className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors ${
                      loading ? 'opacity-50 cursor-not_allowed' : ''
                    }`}
                  >
                    {loading ? 'Booking...' : 'Book Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Service</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={bookingFormData.name}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                  className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={bookingFormData.email}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                  className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Event Date</label>
                <input
                  type="date"
                  value={bookingFormData.eventDate}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, eventDate: e.target.value })}
                  className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Additional Notes</label>
                <textarea
                  value={bookingFormData.notes}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                  className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-1/2 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-1/2 border border-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Events Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Event?</h2>
            <p className="text-xl text-gray-600">
              We can create a personalized event package tailored to your specific needs.
            </p>
          </div>
          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Request Custom Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

//-----------------------------------17-4-25---------------------------

// import { useState, useEffect } from 'react';
// import { Star } from 'lucide-react';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// // Initialize Stripe with your public key
// const stripePromise = loadStripe('your_stripe_publishable_key_here'); // Replace with your Stripe publishable key

// function Services() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [selectedServiceId, setSelectedServiceId] = useState(null);
//   const [bookingFormData, setBookingFormData] = useState({
//     name: '',
//     email: '',
//     eventDate: '',
//     notes: '',
//   });
//   const API_BASE_URL = 'http://localhost:8000';

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/services`);
//         setServices(response.data);
//       } catch (err) {
//         console.error('Error fetching services:', err);
//         setError('Failed to load services.');
//       }
//     };
//     fetchServices();
//   }, []);

//   const handleBookNow = (serviceId) => {
//     setSelectedServiceId(serviceId);
//     setBookingFormData({ name: '', email: '', eventDate: '', notes: '' });
//     setIsBookingModalOpen(true);
//   };

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, index) => (
//       <Star
//         key={index}
//         className={`h-5 w-5 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//       />
//     ));
//   };

//   // Payment Form Component
//   const PaymentForm = ({ onSubmit }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [paymentError, setPaymentError] = useState(null);
//     const [paymentLoading, setPaymentLoading] = useState(false);

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setPaymentLoading(true);
//       setPaymentError(null);

//       if (!stripe || !elements) {
//         setPaymentError('Stripe has not loaded. Please try again.');
//         setPaymentLoading(false);
//         return;
//       }

//       const cardElement = elements.getElement(CardElement);

//       try {
//         // Create a payment intent on the backend
//         const { data: { clientSecret } } = await axios.post(`${API_BASE_URL}/api/create-payment-intent`, {
//           serviceId: selectedServiceId,
//         });

//         // Confirm the card payment
//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               name: bookingFormData.name,
//               email: bookingFormData.email,
//             },
//           },
//         });

//         if (error) {
//           setPaymentError(error.message);
//           setPaymentLoading(false);
//           return;
//         }

//         if (paymentIntent.status === 'succeeded') {
//           // Payment successful, proceed with booking
//           await onSubmit(paymentIntent.id);
//         }
//       } catch (err) {
//         console.error('Payment error:', err);
//         setPaymentError('Failed to process payment. Please try again.');
//         setPaymentLoading(false);
//       }
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm text-gray-600 mb-1">Card Details</label>
//           <div className="p-2 border rounded bg-white">
//             <CardElement
//               options={{
//                 style: {
//                   base: {
//                     fontSize: '16px',
//                     color: '#424770',
//                     '::placeholder': {
//                       color: '#aab7c4',
//                     },
//                   },
//                   invalid: {
//                     color: '#9e2146',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//         {paymentError && <p className="text-red-600 mb-4">{paymentError}</p>}
//         <button
//           type="submit"
//           disabled={!stripe || paymentLoading || loading}
//           className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors ${
//             paymentLoading || loading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {paymentLoading ? 'Processing Payment...' : 'Pay and Book'}
//         </button>
//       </form>
//     );
//   };

//   const handleBookingSubmit = async (paymentIntentId) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const userId = 'guest'; // Placeholder; implement proper auth in production
//       const response = await axios.post(`${API_BASE_URL}/api/bookings`, {
//         serviceId: selectedServiceId,
//         userId,
//         name: bookingFormData.name,
//         email: bookingFormData.email,
//         eventDate: bookingFormData.eventDate,
//         notes: bookingFormData.notes,
//         status: 'Pending',
//         paymentIntentId, // Include payment intent ID
//       });
//       setSuccess(`Booking created successfully! Payment ID: ${paymentIntentId}`);
//       setIsBookingModalOpen(false);
//     } catch (err) {
//       console.error('Error creating booking:', err);
//       setError('Failed to create booking. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="py-12">
//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
//         <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           We offer a comprehensive range of event planning services to make your special occasions truly memorable.
//         </p>
//       </div>

//       {/* Feedback Messages */}
//       {error && <p className="text-center text-red-600">{error}</p>}
//       {success && <p className="text-center text-green-600">{success}</p>}

//       {/* Services Grid */}
//       <div className="max-w-7xl mx-auto px-4 mb-12">
//         {services.length === 0 ? (
//           <p className="text-center text-gray-600">No services available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {services.map((service) => (
//               <div key={service._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div
//                   className="h-64 bg-cover bg-center"
//                   style={{ backgroundImage: `url(${API_BASE_URL}${service.image})` }}
//                 />
//                 <div className="p-6">
//                   <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
//                   <p className="text-gray-600 mb-4">{service.description}</p>
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       {renderStars(service.rating)}
//                       <span className="ml-2 text-gray-600">({service.rating})</span>
//                     </div>
//                     <span className="text-2xl font-bold text-indigo-600">${service.price}</span>
//                   </div>
//                   <button
//                     onClick={() => handleBookNow(service._id)}
//                     disabled={loading}
//                     className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors ${
//                       loading ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {loading ? 'Booking...' : 'Book Now'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Booking Modal */}
//       {isBookingModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Service</h3>
//             <div>
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={bookingFormData.name}
//                   onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
//                   className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={bookingFormData.email}
//                   onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
//                   className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-1">Event Date</label>
//                 <input
//                   type="date"
//                   value={bookingFormData.eventDate}
//                   onChange={(e) => setBookingFormData({ ...bookingFormData, eventDate: e.target.value })}
//                   className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-1">Additional Notes</label>
//                 <textarea
//                   value={bookingFormData.notes}
//                   onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
//                   className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
//                 />
//               </div>
//               <Elements stripe={stripePromise}>
//                 <PaymentForm onSubmit={handleBookingSubmit} />
//               </Elements>
//               <button
//                 type="button"
//                 onClick={() => setIsBookingModalOpen(false)}
//                 className="w-full border border-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-200 mt-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom Events Section */}
//       <div className="bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-8 VIC">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Event?</h2>
//             <p className="text-xl text-gray-600">
//               We can create a personalized event package tailored to your specific needs.
//             </p>
//           </div>
//           <div className="text-center">
//             <a
//               href="/contact"
//               className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
//             >
//               Request Custom Quote
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Services;
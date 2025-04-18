// import axios from 'axios';
// import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// function Contact() {
//   // savecontact फंक्शन को अपडेट करें
//   const savecontact = (e) => {
//     e.preventDefault(); // फॉर्म सबमिट होने से रोकें

//     // फॉर्म डेटा प्राप्त करें
//     const formData = {
//       name: e.target.elements.name.value,
//       email: e.target.elements.email.value,
//       phone: e.target.elements.phone.value,
//       message: e.target.elements.message.value
//     };

//     // सर्वर पर POST रिक्वेस्ट भेजें
//     axios
//       .post('http://localhost:8000/message/api/insert', formData)
//       .then((res) => {
//         console.log(res.data);
//         alert('संदेश सफलतापूर्वक भेजा गया!');
//         e.target.reset(); // फॉर्म को रीसेट करें
//       })
//       .catch((error) => {
//         console.error('त्रुटि:', error);
//         alert('संदेश भेजने में विफल रहा। कृपया पुनः प्रयास करें।');
//       });
//   };

//   return (
//     <div className="py-12">
//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
//         <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           Have questions about our services? We are here to help you create the perfect event.
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
//             <form className="space-y-6" onSubmit={savecontact}>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name" // name एट्रीब्यूट जोड़ा गया
//                   className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email" // name एट्रीब्यूट जोड़ा गया
//                   className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone" // name एट्रीब्यूट जोड़ा गया
//                   className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message" // name एट्रीब्यूट जोड़ा गया
//                   rows={4}
//                   className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
//                   required
//                 ></textarea>
//               </div>

//               <button
//                 type="submit" // type="submit" जोड़ा गया
//                 className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
//               <div className="space-y-6">
//                 <div className="flex items-start space-x-4">
//                   <Phone className="h-6 w-6 text-indigo-600 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Phone</h3>
//                     <p className="text-gray-600">+1 (555) 123-4567</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <Mail className="h-6 w-6 text-indigo-600 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Email</h3>
//                     <p className="text-gray-600">info@eventmaster.com</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Address</h3>
//                     <p className="text-gray-600">123 Event Street, Suite 100<br />New York, NY 10001</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <Clock className="h-6 w-6 text-indigo-600 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Business Hours</h3>
//                     <p className="text-gray-600">
//                       Monday - Friday: 9:00 AM - 6:00 PM<br />
//                       Saturday: 10:00 AM - 4:00 PM<br />
//                       Sunday: Closed
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-indigo-50 rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-indigo-900 mb-2">Need Urgent Assistance?</h3>
//               <p className="text-indigo-700 mb-4">
//                 For urgent inquiries outside business hours, please call our 24/7 event support line.
//               </p>
//               <p className="text-xl font-semibold text-indigo-600">
//                 +1 (555) 999-8888
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;
//------------------------------2 changis------------------------------------------------------------------------------------

import { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/message/api/insert', formData);
      console.log(response.data);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about our services? We are here to help you create the perfect event.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@eventmaster.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">123 Event Street, Suite 100<br />New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Need Urgent Assistance?</h3>
              <p className="text-indigo-700 mb-4">
                For urgent inquiries outside business hours, please call our 24/7 event support line.
              </p>
              <p className="text-xl font-semibold text-indigo-600">+1 (555) 999-8888</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
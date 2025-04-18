// import { Link, useNavigate } from 'react-router-dom';
// import { User, Mail, Lock } from 'lucide-react';
// import { useState } from 'react';

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (!formData.role) {
//       setError('Please select a role');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       role: formData.role,
//       createdAt: new Date().toISOString(),
//     };

//     console.log('Sending payload:', payload);

//     try {
//       const response = await fetch('http://localhost:8000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log('Response:', data);

//       if (response.ok) {
//         // Do not store token here; redirect to login instead
//         setFormData({
//           name: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           role: '',
//         });
//         navigate('/login'); // Redirect to login page after successful registration
//       } else {
//         setError(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An unexpected error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center py-12 px-4">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div>
//           <h2 className="text-3xl font-bold text-center text-gray-900">Create Account</h2>
//           <p className="mt-2 text-center text-gray-600">Join us to start planning your events</p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//               <div className="mt-1 relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//               <div className="mt-1 relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
//               <div className="mt-1 relative">
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
//                 >
//                   <option value="">Select a role</option>
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                   <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <div className="mt-1 relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
//                   placeholder="Create a password"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <div className="mt-1 relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
//                   placeholder="Confirm your password"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
//                 loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//             >
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

//------------------------------------------24 changis--------------------------------------------------------------------------------
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../images/logo.png';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.role) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    console.log('Sending payload:', payload);

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
        });
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img 
            src={logo} // Replace with your actual logo path
            alt="Company Logo"
            className="mx-auto h-16 w-auto mb-4" // Adjust size as needed
          />
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join us to start planning your events</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/aternary h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1 relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
                >
                  <option value="">Select a role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
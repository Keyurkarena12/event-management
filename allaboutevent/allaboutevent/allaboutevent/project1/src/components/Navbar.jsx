// import { Link, useNavigate } from 'react-router-dom';
// import { Calendar, User } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import logo from '../../../images/navbarlogo.jpg';

// const Navbar = () => {
//   const [isOpen, setIsOPen] = useState(false);
//   const dropdownref = useRef(null);
//   const navigate = useNavigate();


//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownref.current && !dropdownref.current.contains(event.target)) {
//         setIsOPen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleNavigate = (path) => {
//     navigate(path);
//     setIsOPen(false);
//   }


//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2">
//               <img src={logo} alt='logo' width={80} height={80} />
//               <span className="font-bold text-xl text-gray-900">All About Events</span>
//             </Link>
//           </div>

//           <div className="flex items-center space-x-8">
//             <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
//             <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
//             <Link to="/services" className="text-gray-700 hover:text-indigo-600">Services</Link>
//             <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>

//             <div className="relative group" ref={dropdownref}>
//               <button onClick={(() => setIsOPen(!isOpen))} className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
//                 <User className="h-5 w-5" />
//                 <span>Account</span>
//               </button>
//               {isOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1  group-hover:block">
//                   <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleNavigation('/login')} >Login</Link>
//                   <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleNavigation('/register')}>Register</Link>
//                   <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleNavigation('/dashboard')}>User Dashboard</Link>
//                   <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleNavigation('/admin')}>Admin Panel</Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import logo from '../../../images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Consistent naming convention
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Dependency array is empty since we don't need to watch any values

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt='logo' width={80} height={80} />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-indigo-600">Services</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} // Fixed typo and simplified
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => handleNavigate('/login')} // Fixed function name
                  >Login</Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => handleNavigate('/register')}
                  >Register</Link>
                  {/* <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => handleNavigate('/dashboard')}
                  >User Dashboard</Link>
                  <Link 
                    to="/admin" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => handleNavigate('/admin')}
                  >Admin Panel</Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
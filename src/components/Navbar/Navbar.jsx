import { useState, useRef, useEffect } from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiChevronDown, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='navbar absolute z-50 h-100 py-3'>
      <div id='title-name' className='text-4xl font-bold ps-4'>Manora</div>
      <div className='flex'>
        <ul className='my-auto flex gap-4'>
          <li><Link className='text-black font-semibold text-lg' to='/'>Home</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/lost-and-found'}>Lost & Found</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/manora/gallery'}>Photo Gallery</Link></li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center pr-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 focus:outline-none bg-blue-950 p-1 pr-2  rounded border border-blue-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-md border-2 border-white object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center text-blue-900">
                    <span className="font-bold text-lg">{user.name?.charAt(0).toUpperCase() || "U"}</span>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-blue-900 rounded-full"></div>
              </div>

              <span className="font-medium text-white text-sm hidden sm:block max-w-[100px] truncate">
                {user.name?.split(' ')[0]}
              </span>

              <motion.div
                animate={{ rotate: showDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="text-white/80" size={16} />
              </motion.div>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                    <p className="font-semibold text-gray-900 truncate" title={user.email}>{user.email}</p>
                  </div>

                  <div className="py-2">
                    <button
                      className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rubik flex items-center gap-3 transition-colors"
                      onClick={() => alert("Profile settings not implemented yet.")}
                    >
                      <FiUser className="text-gray-400" size={16} />
                      <span>My Profile</span>
                    </button>
                    <button
                      className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rubik flex items-center gap-3 transition-colors"
                      onClick={() => alert("Settings not implemented yet.")}
                    >
                      <FiSettings className="text-gray-400" size={16} />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-50 pt-2 pb-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 transition-colors font-medium"
                    >
                      <FiLogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 font-bold text-white bg-blue-900 rounded-md shadow-md hover:shadow-lg hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 font-bold text-white bg-blue-900 rounded-md shadow-md hover:shadow-lg hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

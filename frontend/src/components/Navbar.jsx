import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token to log out
    navigate('/login');  // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md transition-transform transform hover:scale-105 duration-300">
  <div className="container mx-auto flex justify-between items-center">
    <Link to="/" className="text-white font-bold text-xl hover:text-blue-200 transition-colors duration-300">
      MyBlog
    </Link>
    <div className="flex items-center space-x-4">
      {/* Display different options depending on whether the user is logged in or not */}
      {!token ? (
        <>
          <Link
            to="/login"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-300"
          >
            Signup
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-300"
          >
            Profile
          </Link>
          <Link
            to="/create-post"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-300"
          >
            Create Post
          </Link>
          <Link
            to="/"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-300"
          >
            View Posts
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="px-6 py-4 flex justify-between items-center"
      style={{ backgroundColor: 'oklch(0.283 0.141 291.089)', color: 'white' }}
    >
      <div className="text-xl font-bold">
        <Link to="/" className="hover:underline">Bookshelf</Link>
      </div>

      <div className="space-x-4 flex items-center">
        <Link
          to="/"
          className="transition duration-300 hover:text-rose-200"
        >
          Home
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/add-book"
              className="transition duration-300 hover:text-rose-200"
            >
              Add Book
            </Link>

            <button
              onClick={handleLogout}
              className="bg-rose-300 text-black px-3 py-1 rounded hover:bg-rose-200 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="transition duration-300 hover:text-rose-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="transition duration-300 hover:text-rose-200"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

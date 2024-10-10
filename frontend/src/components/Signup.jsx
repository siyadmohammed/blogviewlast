import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.password2) {
    alert('Passwords do not match');
    return;
  }
  try {
    await axios.post('http://localhost:8000/api/register/', formData);
    alert('Signup successful');
    navigate('/login'); // Redirect to login page after successful signup
  } catch (error) {
    // Log the actual error response for debugging
    if (error.response) {
      alert('Signup error: ' + error.response.data.detail || 'Unknown error');
      console.error('Signup error:', error.response.data);
    } else {
      alert('Signup error: Could not connect to server');
      console.error('Signup error:', error.message);
    }
  }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300">
  <h1 className="text-2xl font-bold mb-4">Signup</h1>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="username"
      placeholder="Username"
      value={formData.username}
      onChange={handleChange}
      required
      className="mb-2 w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
      className="mb-2 w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      required
      className="mb-2 w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
    />
    <input
      type="password"
      name="password2"
      placeholder="Confirm Password"
      value={formData.password2}
      onChange={handleChange}
      required
      className="mb-2 w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
    >
      Signup
    </button>
  </form>

  {/* Login button to navigate to the login page */}
  <button
    onClick={() => navigate('/login')}
    className="mt-4 bg-gray-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
  >
    Already have an account? Login
  </button>
</div>

  );
};

export default Signup;
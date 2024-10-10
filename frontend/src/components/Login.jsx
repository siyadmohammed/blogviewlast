import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/login/', {  // Ensure this matches your Django URLs
        username,
        password
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);  // Store token
        navigate('/');  // Redirect to PostList page
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300">
  <h1 className="text-2xl font-bold mb-4">Login</h1>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      className="mb-2 w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="mb-4 w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
    >
      Login
    </button>
  </form>
</div>

  );
};

export default Login;

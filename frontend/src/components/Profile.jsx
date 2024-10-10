import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profile/');
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setProfilePhoto(response.data.profile_photo);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

const handleUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);

  // Ensure profilePhoto is appended only if a file is selected
  if (profilePhoto instanceof File) {
    formData.append('profile_photo', profilePhoto);
  } else {
    console.log("No valid file selected or profile photo is not a File object");
  }

  // Log the form data to ensure it's correct
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    await axiosInstance.put('/api/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Profile updated successfully');
    setIsEditing(false); // Close the edit form after submission

    // Re-fetch the profile data to update the UI
    const response = await axiosInstance.get('/api/profile/');
    setUser(response.data);
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.response) {
      alert('Failed to update profile: ' + (error.response.data.detail || error.message));
    } else {
      alert('Failed to update profile: ' + error.message);
    }
  }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300">
  <h1 className="text-2xl font-bold mb-4">Profile</h1>
  {user && !isEditing && (
    <div>
      <div className="mb-4 flex justify-center">
        <img
          src={user.profile_photo}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-110"
        />
      </div>
      <p className="mb-2 text-lg">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="mb-2 text-lg">
        <strong>Email:</strong> {user.email}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="bg-blue-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      >
        Update Profile
      </button>
    </div>
  )}

  {isEditing && (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="mb-2 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-2 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfilePhoto(e.target.files[0])}
        className="mb-2 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="mt-2 bg-gray-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
      >
        Cancel
      </button>
    </form>
  )}
</div>

  );
};

export default Profile;

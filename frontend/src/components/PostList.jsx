import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts/');
        setPosts(response.data);  // Assuming the response is an array of posts
      } catch (error) {
        setError('Error fetching posts');
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleUpdateClick = (post) => {
    setEditingPostId(post.id);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
  };

  const handleUpdateSubmit = async (postId) => {
    try {
      const response = await axiosInstance.put(`/api/posts/${postId}/`, {
        title: updatedTitle,
        content: updatedContent,
      });
      alert('Post updated successfully');
      setEditingPostId(null);
      // Refresh posts after update
      const updatedPosts = posts.map((post) => (post.id === postId ? response.data : post));
      setPosts(updatedPosts);
    } catch (error) {
      alert('Error updating post: ' + error.message);
    }
  };

  const handleDeleteClick = async (postId) => {
    try {
      await axiosInstance.delete(`/api/posts/${postId}/`);
      alert('Post deleted successfully');
      // Refresh posts after deletion
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      alert('Error deleting post: ' + error.message);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
  <h1 className="text-3xl mb-4">Your Posts</h1>
  {posts.length === 0 ? (
    <p className="text-gray-500">No posts found.</p>
  ) : (
    posts.map((post) => (
      <div key={post.id} className="mb-4 p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
        {editingPostId === post.id ? (
          <div>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="mb-2 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className="mb-2 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              onClick={() => handleUpdateSubmit(post.id)}
              className="bg-green-500 text-white w-full py-2 mb-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingPostId(null)}
              className="bg-gray-500 text-white w-full py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-500">
              Tags: {Array.isArray(post.tags) ? post.tags.join(', ') : 'No tags'}
            </p>
            <button
              onClick={() => handleUpdateClick(post)}
              className="bg-blue-500 text-white w-full py-2 mb-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              Update Post
            </button>
            <button
              onClick={() => handleDeleteClick(post.id)}
              className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    ))
  )}
</div>

  );
};

export default PostList;

// PostDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`/api/posts/${id}/`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/posts/${id}/`);
            navigate('/'); // Redirect after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 duration-300">
  <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
  <p className="text-gray-700 mb-4">{post.content}</p>
  <p className="text-sm text-gray-500 mb-4">
    Tags: {Array.isArray(post.tags) ? post.tags.join(', ') : 'No tags'}
  </p>
  <button
    onClick={handleDelete}
    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
  >
    Delete Post
  </button>
</div>
    );
};

export default PostDetail;

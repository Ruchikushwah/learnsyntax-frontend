import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPost = () => {
  const { topic_id } = useParams(); // The id here corresponds to the topic id
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post based on topic ID
  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/topics/${topic_id}/post`);
      const data = await response.json();
    //   console.log(data);

      if (response.ok) {
        setPost(data.post || null);
      } else {
        setError(data.message || 'Failed to fetch post details.');
      }
    } catch (error) {
      setError('Error fetching post data.');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchPost when component mounts
  useEffect(() => {
    fetchPost();
  }, [topic_id]);

  if (loading) {
    return <div className="text-center py-10">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>No post data available for this topic.</p>
      </div>
    );
  }

  return (
  <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg">
    {/* Back Button */}
    <button 
      onClick={() => navigate(-1)} 
      className="text-white bg-teal-500 px-4 py-2 rounded-md mb-6"
    >
      Back
    </button>

    <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

    {post.image_path && (
      <img 
        src={`http://127.0.0.1:8000/storage/${post.image_path}`} 
        alt="Post Image" 
        className="w-full h-64 object-cover rounded-md mb-6"
      />
    )}

    <div className="prose prose-lg">
      <p>{post.content}</p>
    </div>
  </div>
);

};

export default ViewPost;

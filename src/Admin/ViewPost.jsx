import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ViewPost = () => {
  const {id } = useParams(); // The id here corresponds to the topic id
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post based on topic ID
  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/topics/${id}/post`);
      const data = await response.json();
    //   console.log(data);

      if (response.ok) {
        setPost(data.data || null);
        console.log('ruchi',data.post)
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
  }, [id]);

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
    <div className="relative overflow-x-auto w-full py-6 px-8">
      <h2 className="text-lg font-bold text-gray-700 border-l-4 border-teal-600 p-1">
        Manage Post
      </h2>

      <div className="flex flex-col md:flex-row justify-between md:items-center py-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full md:w-64 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                content
              </th>
              <th scope="col" className="px-6 py-3">
                Post Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {post.map((items) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={items.id}>
                <td className="px-6 py-4">{items.id}</td>
                <td className="px-6 py-4">{items.title}</td>
                <td className="px-6 py-4 line-clamp-1">{items.content}</td>
                <td className="px-6 py-4">
                  <img
                    src={`http://127.0.0.1:8000/storage/post/${items.image}`}
                    className="w-16 h-16"
                  />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    className="ml-2 text-white bg-red-600 hover:underline p-2 rounded-md "
                    onClick={() => handleDelete(items.id)}
                    title="delete"
                  >
                    <MdDelete size={22} />
                  </button>
                  <Link to={`/admin/viewcourse/viewpost/${items.id}`}>
                    <button
                      className=" text-white px-2 py-2 bg-teal-500
                        text-center rounded-md "
                      title="edit"
                    >
                      <FiEdit size={22} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default ViewPost;

import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { GrChapterAdd } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { useParams,  Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const ViewPost = () => {

  const { id, topic_id } = useParams(); // The id here corresponds to the post id
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[searchPost ,setSearchPost] = useState("");

  // Fetch post based on topic ID
  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${APP_URL}/api/topics/${topic_id}/post`);
      const data = await response.json();
      console.log("mydata", data);

      if (response.ok) {
        setPost(data.post || null);
        console.log('ruchi', data.post)
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
  }, [id, topic_id]);

const haldleSearchChange = (e) =>{
  setSearchPost(e.target.value);
}

const filteredPost = post.filter(items =>
   items.title.toLowerCase().includes(searchPost.toLowerCase()) ||
  items.content.toLowerCase().includes(searchPost.toLowerCase()));

  const handleDelete = async (post_id) => {
    let resp = await fetch(`${APP_URL}/api/topics/${topic_id}/posts/${post_id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      console.log(`post deleted successfully`);
      // Update the state to remove the deleted post
      setPost((prevPosts) => prevPosts.filter((item) => item.id !== post_id));
    } else {
      console.error("failed to delete post", resp);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="  w-16 h-16 ">
          <BeatLoader color=" #14b8a6" />
        </div>
      </div>
    );
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
          value={searchPost}
          onChange={haldleSearchChange}
          placeholder="Search..."
          className="p-2 border rounded w-full md:w-64 focus:outline-none"
        />
        <Link
          to={`/admin/insertpost/${topic_id}`}
          // /admin/insertpost/:topic_id
          className="text-white px-4 py-2 bg-teal-500 rounded-md md:ml-auto"
        >
          Add Post
        </Link>
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
            {filteredPost.map((items) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={items.id}>
                <td className="px-6 py-4">{items.id}</td>
                <td className="px-6 py-4">{items.title}</td>
                <td className="px-6 py-4 line-clamp-3">{parse(items.content)}</td>
                <td className="px-6 py-4">
                  <img
                    src={`${APP_URL}/storage/${items.image_path}`}
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
                  <Link to={`/admin/viewcourse/editpost/${topic_id}/${items.id}`}>
                    {/* here we will send the chapter_id as well */}
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

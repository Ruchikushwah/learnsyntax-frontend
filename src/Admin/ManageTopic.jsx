import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ManageTopic = () => {
  const { chapterId,topicId } = useParams(); // Get the chapterId from the URL params
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredTopics, setFilteredTopics] = useState([]);

  // Fetch all topics for the specified chapter
  useEffect(() => {
    async function fetchTopics() {
      try {
        const url = `http://127.0.0.1:8000/api/chapters/${chapterId}/topics`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopics(data.data);
        setFilteredTopics(data.data);
        console.log("Fetched Topics:", data.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
    fetchTopics();
  }, [chapterId]);

  // Handle the deletion of a topic
  const handleDelete = async (topicId) => {
    try {
      const url = `http://127.0.0.1:8000/api/chapters/${chapterId}/topics/${topicId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Topic ${topicId} deleted successfully`);
        // Update the local list of topics
        setTopics(topics.filter((topic) => topic.id !== topicId));
        setFilteredTopics(filteredTopics.filter((topic) => topic.id !== topicId));
      } else {
        console.error("Failed to delete topic", response);
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  // Handle search input for topics
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = topics.filter(
      (topic) =>
        topic.topic_name.toLowerCase().includes(query) ||
        topic.topic_description.toLowerCase().includes(query)
    );
    setFilteredTopics(filtered);
  };

  return (
    <div className="relative overflow-x-auto w-full py-10 px-8">
      <h2 className="text-lg font-bold text-gray-700 border-l-4 border-teal-600 p-1">
        Manage Topics for Chapter {chapterId}
      </h2>

      <div className="flex flex-col md:flex-row justify-between md:items-center py-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border rounded w-full md:w-64 focus:outline-none"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to={`/admin/inserttopic/${chapterId}`}>
          <button className="px-4 py-2 font-semibold text-white bg-teal-500 rounded hover:bg-teal-600 w-full md:w-auto">
            Insert Topic
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Topic Name</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Slug</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map((topic) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={topic.id}
              >
                <td className="px-6 py-4">{topic.id}</td>
                <td className="px-6 py-4">{topic.topic_name}</td>
                <td className="px-6 py-4">{topic.topic_description}</td>
                <td className="px-6 py-4">{topic.topic_slug}</td>
                <td className="px-6 py-4 gap-3 flex">
                  <button className="text-blue-500 hover:underline mr-2">
                    Edit
                  </button>
                  <button
                    className="ml-2 text-red-500 hover:underline"
                    onClick={() => handleDelete(topic.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTopics.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No topics found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageTopic;

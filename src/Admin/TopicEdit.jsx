import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TopicEdit = () => {
  const [formData, setFormData] = useState({
    topic_name: "",
    topic_description: "",
    order: "",
  });
  const [updateMessage, setUpdateMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { chapterId, topicId } = useParams(); //these in the route.
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/chapters/${chapterId}/topics/${topicId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Update response", data);
      setUpdateMessage("Topic Updated Successfully");
      setErrorMessage(null);
      setTimeout(() => navigate("/topics"), 2000); // Navigate after showing success
    } catch (error) {
      setUpdateMessage(null);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Edit Topic</h2>

        {updateMessage && (
          <div className="mb-4 text-green-600">{updateMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600">{errorMessage}</div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label
              htmlFor="topic_name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Topic Name
            </label>
            <input
              type="text"
              id="topic_name"
              name="topic_name"
              value={formData.topic_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="topic_description"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Topic Description
            </label>
            <textarea
              id="topic_description"
              name="topic_description"
              value={formData.topic_description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="order"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Order
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicEdit;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InsertTopic = () => {
  const { chapterId } = useParams();  // Fetch the chapterId from URL params
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [order, setOrder] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const topicData = {
      topic_name: topicName,
      topic_description: topicDescription,
      order: order,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/chapters/${chapterId}/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topicData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Topic Added Successfully");

        // Reset input fields
        setTopicName("");
        setTopicDescription("");
        setOrder("");
        
        // Navigate to the topic management page after success
        navigate("/admin/managetopic/:chapterId");
      } else {
        alert("Failed to add topic");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while adding topic");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Insert Topic</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Topic Name
          </label>
          <input
            type="text"
            id="name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter topic name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Topic Description
          </label>
          <textarea
            id="description"
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter topic description"
            rows="4"
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
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter order number"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertTopic;

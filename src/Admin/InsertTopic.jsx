import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const InsertTopic = () => {
  const { id, course_slug, chapterId } = useParams(); // Fetch the chapterId from URL params
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [order, setOrder] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    //Validate Topic Name
    if (!topicName) {
      formErrors.topicName = "Topic Name is required";
      isValid = false;
    }
    //Validate Topic Description
    if (!topicDescription) {
      formErrors.topicDescription = "Topic Description is required";
      isValid = false;
    }
    // Validate Chapter Order
    if (!order) {
      formErrors.order = "Topic Order is required";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const topicData = {
      topic_name: topicName,
      topic_description: topicDescription,
      order: order,
    };

    try {
      // this will give all the topics related to the chapterid
      const response = await fetch(
        `${APP_URL}/api/chapters/${chapterId}/topics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(topicData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Topic added succesfully");

        // Reset input fields
        setTopicName("");
        setTopicDescription("");
        setOrder("");

        // Navigate to the topic management page after success
        navigate(-1);
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
          {errors.topicName && (
            <p className="text-red-500 text-sm">{errors.topicName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Topic Description
          </label>
          <ReactQuill
            theme="snow"
            value={topicDescription}
            onChange={setTopicDescription}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 truncate"
          />
          {errors.topicDescription && (
            <p className="text-red-500 text-sm">{errors.topicDescription}</p>
          )}
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
        {errors.order && <p className="text-red-500 text-sm">{errors.order}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
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

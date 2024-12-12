import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InsertChapter = () => {
  const { id } = useParams();
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [order, setOrder] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const chapterData = {
      chapter_name: chapterName,
      chapter_description: chapterDescription,
      order: order,
      course_id: id,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chapter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chapterData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Chapter Added Successfully");

        setChapterName("");
        setChapterDescription("");
        setOrder("");
        navigate("/admin/managechapter");
      } else {
        alert("Failed to add chapter");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occured while adding chapter");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Insert Chapter</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Chapter Name
          </label>
          <input
            type="text"
            id="name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="descrition"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Chapter Description
          </label>
          <textarea
            id="description"
            value={chapterDescription}
            onChange={(e) => setChapterDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your chapter description"
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

export default InsertChapter;

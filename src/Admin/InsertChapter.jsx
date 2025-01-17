import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";


const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const InsertChapter = () => {
  const { id } = useParams();
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [order, setOrder] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate Chapter Name
    if (!chapterName) {
      formErrors.chapterName = "Chapter Name is required";
      isValid = false;
    }

    // Validate Chapter Description
   
      if(!chapterDescription){
        formErrors.chapterDescription = "Chapter Description is required";
        isValid = false;
      }
    

    // Validate Chapter Order
    if (!order || isNaN(order) || parseInt(order, 10) <= 0) {
      formErrors.order = "Valid Chapter Order is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

 

  const handleChapter = async () => {
    if (!validateForm()) {
      return;
    }

    
    const chapterData = {
      chapter_name: chapterName,
      chapter_description: chapterDescription,
      order: parseInt(order, 10),
      course_id: id,
    };

    try {
      const response = await fetch(`${APP_URL}/api/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chapterData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Chapter added successfully");

        setChapterName("");
        setChapterDescription("");
        setOrder("");
        navigate(-1);
      } else {
        alert("Failed to add chapter");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while adding chapter");
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
            placeholder="Enter chapter name"
            required
          />
          {errors.chapterName && (
            <p className="text-red-500 text-sm">{errors.chapterName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Chapter Description
          </label>
          <ReactQuill
            theme="snow"
            value={chapterDescription}
            onChange={setChapterDescription} // Correct onChange handler
            className="w-full border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.chapterDescription && (
            <p className="text-red-500 text-sm">{errors.chapterDescription}</p>
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
          {errors.order && (
            <p className="text-red-500 text-sm">{errors.order}</p>
          )}
        </div>

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
            onClick={handleChapter}
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

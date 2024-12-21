import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { useNavigate } from "react-router-dom";

const InsertCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate Title
    if (!title.trim()) {
      formErrors.title = "Course title is required";
      isValid = false;
    }

    // Validate Description
    if (!description.trim()) {
      formErrors.description = "Course description is required";
      isValid = false;
    }

    // Validate Image
    if (!image) {
      formErrors.image = "Course image is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleCourse = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/courses", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        alert("Course Added Successfully");
        setTitle("");
        setDescription("");
        setImage("");
        setErrors({});
        navigate(-1);
      } else {
        alert("Failed to add course");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while adding course");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Insert Course</h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Course Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter Course Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Course Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="bg-white"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Course Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleCourse}
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertCourse;

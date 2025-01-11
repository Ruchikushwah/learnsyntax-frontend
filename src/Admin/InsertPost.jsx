import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";


const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const InsertPost = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState(null); // Track if this is a draft (saved post ID)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!title) {
      formErrors.title = "Title is required";
      isValid = false;
    }

    if (!content) {
      formErrors.content = "Content is required";
      isValid = false;
    }

    if (!imagePath && !postId) {
      // Image is required only for new posts
      formErrors.imagePath = "Post image is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handlePost = async (status = false) => {
    // Boolean status: true for draft, false for published
    if (!validateForm()) {
      return;
    }

   
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imagePath) formData.append("image", imagePath);
    // formData.append("status", status);
    formData.append("status", status  ? true : false);
     // Send status as boolean (true for draft, false for published)

    try {
      const response = await fetch(
        postId
          ? `${APP_URL}/api/posts/${postId}` // Update existing post
          : `${APP_URL}/api/topics/${id}/post`, // Create new post
        {
          method: postId ? "PUT" : "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (status && !postId) {
          // If draft and no postId, save postId
          setPostId(result.post.id); // Save post ID for drafts
        } else {
          setTitle("");
          setContent("");
          setImagePath("");
          setPostId(null);
          navigate(-1); // Navigate back
        }
      } else {
        setErrors(result.errors || { general: "Failed to save post" });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "An error occurred while saving the post" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          {postId ? "Edit Post" : "Insert Post"}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter post title"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Content
          </label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>

        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Select Post Image</span>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => setImagePath(e.target.files[0])}
            />
            {imagePath && (
              <img
                src={URL.createObjectURL(imagePath)} // For Live Image
                alt="Preview"
                className="w-auto h-modal flex justify-center items-center top-16 mb-2"
              />
            )}
            {errors.imagePath && (
              <p className="text-red-500 text-sm">{errors.imagePath}</p>
            )}
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => handlePost(true)} // Pass true for draft status
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handlePost(false)} // Pass false for published status
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
          >
            {postId ? "Publish Draft" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertPost;

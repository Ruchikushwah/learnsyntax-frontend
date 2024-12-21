import React, {  useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

const InsertPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    //Validate Chapter Name
    if(!title){
      formErrors.title = " Title is required";
      isValid = false;
    }
    //Validate Chapter Description
    if(!content){
      formErrors.content = "Content  is required";
      isValid = false;
    }
    // Validate Chapter Order
    if(!imagePath){
      formErrors.imagePath = "Chapter image is required";
      isValid = false;
    }
    setErrors (formErrors);
    return isValid;
};

  const handlePost = async () => {
    if(!validateForm()){
      return;
    }
   
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imagePath);


    try {
      const response = await fetch(`http://127.0.0.1:8000/api/topics/${id}/post`, {
        method: "POST",
       
        body: formData,
      });

      const result = await response.json();
     

      if (response.ok) {
        console.log("Post Added Successfully");

        setTitle(""); 
        setContent("");
        setImagePath("");
        navigate(-1);
      } else {
        alert("Failed to add post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occured while adding post");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Insert Post</h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            title
          </label>
          <input
            type="text"
            id="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your name"
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
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
           
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="imagepath"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Post Image
          </label>
          <input
            type="file"
            id="imagepath"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            onChange={(e) => setImagePath(e.target.files[0])}
          />
          {errors.imagePath && (
            <p className="text-red-500 text-sm">{errors.imagePath}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handlePost}
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertPost;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;
const PostEdit = () => {
  const { topic_id, post_id } = useParams();
  const [values, setValues] = useState({
    id: post_id,
    title: "",
    content: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${APP_URL}/api/topics/${topic_id}/posts/${post_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const result = await response.json();
        setValues({
          id: post_id,
          title: result.data.title || "",
          content: result.data.content || "",
        });
      } catch (err) {
        setError(err.message || "An error occurred while fetching post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [topic_id, post_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.title || !values.content ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${APP_URL}/api/topics/${topic_id}/posts/${post_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          content: values.content
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update post.");
      }

      setSuccess("Post updated successfully!");
      setTimeout(() => navigate(-1), 2000);
      // navigate(-1); // Navigate back
    } catch (err) {
      setError(err.message || "An error occurred while updating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Edit Post</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        {loading && <p className="text-gray-600">Loading...</p>}

        {!loading && (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Post Title"
              id="title"
              value={values.title}
              onChange={(value) =>
                setValues({ ...values, title: value })
              }
              required
            />
            <InputField
              label="Post Content"
              id="content"
              value={values.content}
              onChange={(value) =>
                setValues({ ...values, content: value })
              }
              textarea
              required
            />
            
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
                type="submit"
                className={`px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const InputField = ({
  label,
  id,
  value,
  onChange,
  textarea = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          rows="4"
          {...props}
        ></textarea>
      ) : (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          {...props}
        />
      )}
    </div>
  );
};

export default PostEdit;

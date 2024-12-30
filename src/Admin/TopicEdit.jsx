import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const TopicEdit = () => {
  const { chapter_id,topic_id } = useParams();
  const [values, setValues] = useState({
    topic_name: "",
    topic_description: "",
    order: "",
    id : ""
  }); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    const fetchTopicDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/chapters/${chapter_id}/topics/${topic_id}/show`);
        // chapters/{chapterId}/topics/{topicId}/show
        if (!response.ok) throw new Error("Failed to fetch chapter details.");
        const result = await response.json();
        setValues({
          topic_name: result.data.topic_name || "",
          topic_description: result.data.topic_description || "",
          order: result.data.order || "",
          id : result.data.id || ""
        });
      } catch (err) {
        setError(err.message || "An error occurred while fetching chapter details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicDetails();
  }, [topic_id, API_BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.topic_name || !values.topic_description || !values.order) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const data = {
        topic_name: values.topic_name,
        topic_description: values.topic_description,
        order: parseInt(values.order, 10),
        
      };
// chapters/{chapterId}/topics/{topicId}

// http://127.0.0.1:8000/api/courses/2/chapters/2

      const response = await fetch(
        `${API_BASE_URL}/chapters/${chapter_id}/topics/${topic_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update Topic.");
      }

      setSuccess("Topic updated successfully!");
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      setError(err.message || "An error occurred while updating the chapter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Edit Topic</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        {loading && <p className="text-gray-600">Loading...</p>}

        {!loading && (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Topic Name"
              id="name"
              value={values.topic_name}
              onChange={(value) =>
                setValues({ ...values, topic_name: value })
              }
              required
            />
            <InputField
              label="Topic Description"
              id="description"
              value={values.topic_description}
              onChange={(value) =>
                setValues({ ...values, topic_description: value })
              }
              textarea
              required
            />
            <InputField
              label="Order"
              id="order"
              value={values.order}
              onChange={(value) => setValues({ ...values, order: value })}
              type="number"
              min="1"
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

export default TopicEdit;

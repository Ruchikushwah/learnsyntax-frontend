import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ChapterEdit = () => {
  const { id ,chapter_slug } = useParams();
  const [values, setValues] = useState({
    chapter_name: "",
    chapter_description: "",
    order: "",
    id : ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

 

  useEffect(() => {
    const fetchChapterDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/chapters/${id}`);
        if (!response.ok) throw new Error("Failed to fetch chapter details.");

        const result = await response.json();
        setValues({
          chapter_name: result.data.chapter_name || "",
          chapter_description: result.data.chapter_description || "",
          order: result.data.order || "",
          id : result.data.id || ""
        });
      } catch (err) {
        setError(err.message || "An error occurred while fetching chapter details.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.chapter_name || !values.chapter_description || !values.order) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const data = {
        chapter_name: values.chapter_name,
        chapter_description: values.chapter_description,
        order: parseInt(values.order, 10),

      };  
// course/{courseId}/chapter/{chapterId}

// http://127.0.0.1:8000/api/courses/2/chapters/2

      const response = await fetch(
        `http://127.0.0.1:8000/api/course/${id}/chapter/${values.id}`,
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
        throw new Error(result.message || "Failed to update chapter.");
      }
      setSuccess("Chapter updated successfully!");
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
        <h2 className="text-lg font-bold text-gray-700 mb-4">Edit Chapter</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        {loading && <p className="text-gray-600">Loading...</p>}

        {!loading && (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Chapter Name"
              id="name"
              value={values.chapter_name}
              onChange={(value) =>
                setValues({ ...values, chapter_name: value })
              }
              required
            />
            <InputField
              label="Chapter Description"
              id="description"
              value={values.chapter_description}
              onChange={(value) =>
                setValues({ ...values, chapter_description: value })
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

export default ChapterEdit;

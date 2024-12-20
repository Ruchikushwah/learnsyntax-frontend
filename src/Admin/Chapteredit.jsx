import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChapterEdit = () => {
  const { id,course_slug } = useParams();
  const [values, setValues] = useState({
    id: id,
    chapter_name: "",
    chapter_description: "",
    order: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapterDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/chapters/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chapter details");
        }

        const result = await response.json();

        setValues({
          id: id,
          chapter_name: result.data.chapter_name || "",
          chapter_description: result.data.chapter_description || "",
          order: result.data.order || "",
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

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}/chapters/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapter_name: values.chapter_name,
          chapter_description: values.chapter_description,
          order: parseInt(values.order, 10),
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update chapter.");
      }

      console.log("Chapter updated successfully");
      navigate(-1); // Navigate back
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
        {loading && <p className="text-gray-600">Loading...</p>}

        {!loading && (
          <form onSubmit={handleSubmit}>
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
                value={values.chapter_name}
                onChange={(e) => setValues({ ...values, chapter_name: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter chapter name"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Chapter Description
              </label>
              <textarea
                id="description"
                value={values.chapter_description}
                onChange={(e) => setValues({ ...values, chapter_description: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter chapter description"
                rows="4"
                disabled={loading}
                required
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
                value={values.order}
                onChange={(e) => setValues({ ...values, order: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter order number"
                disabled={loading}
                required
              />
            </div>

            <div className="flex justify-end gap-2">
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

export default ChapterEdit;

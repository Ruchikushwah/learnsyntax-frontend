import React, { useState, useEffect } from "react";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const Setting = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [updateMessage, setUpdateMessage] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch(`${APP_URL}/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (!data.adminData || typeof data.adminData !== "object") {
          throw new Error("Unexpected data format from API.");
        }

        setAdmin(data.adminData);
        setFormData({
          name: data.adminData.name || "",
          email: data.adminData.email || "",
        });
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Update response:", data);

      setAdmin(data.user);
      setUpdateMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "An error occurred during the update.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Admin Profile</h1>
      {updateMessage && <p className="text-green-500">{updateMessage}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
      {admin && (
        <div className="mt-4">
          <h2 className="font-bold">Current Admin Details:</h2>
          <p>
            <strong>Name:</strong> {admin.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {admin.email || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Setting;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const Description = ({ label, field }) => {
  const [edit, setEdit] = useState(true);
  const [description, setDescription] = useState(field);

  const { id } = useParams();

  const handleUpdate = async () => {
    try {
      let resp = await fetch(`${APP_URL}/api/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      resp = await resp.json();
      alert(resp.message);
      setEdit(false);
    } catch (error) {
      console.error("Failed to update description:", error);
      alert("Error updating description");
    }
  };

  return (
    <>
      {" "}
      <div className="border bg-gray-200 h-48 justify-center items-center flex flex-col gap-3 p-2 m-2 rounded-lg">
        <label className="mt-2 font-semibold">{label}</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="rounded border w-full"
        />
        <button
          className="px-6 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 ml-6 self-end"
          onClick={handleUpdate}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Description;

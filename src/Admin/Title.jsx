import React, {  useState } from "react";
import { useParams } from "react-router-dom";

const Title = ({ label, field }) => {
  const [edit, setEdit] = useState(true);
  const [title, setTitle] = useState(field);

  const { id } = useParams();

const handleUpdate = async () => {
    let resp = await fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify({title}),
      headers: {
        "content-Type": "application/json",
      },
    });
    resp = await resp.json();
    alert(resp.message);
    setEdit(false);
    setTitle("");
  };

  // const fetchdata = async (id) => {
  //     const getdata = await fetch(`http://127.0.0.1:8000/api/courses/${id}`,{
  //       method: "GET",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "content-Type": "application/json",
  //     },
  //     getdata = await getdata.json()
  //     setData(getdata)
  // })

  return (
    <div className=" border bg-gray-200  h-44  justify-center items-center flex flex-col gap-3 p-2 m-2 rounded-lg ">
      <label className=" mt-2 font-semibold">{label}</label>
      <input
        type="text"
        className="p-3 border rounded w-full flex  focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="px-6 py-2 text-white bg-teal-500 rounded hover:teal-blue-600 ml-6  self-end"
        onClick={handleUpdate}
      >
        Save
      </button>
    </div>
  );
};

export default Title;

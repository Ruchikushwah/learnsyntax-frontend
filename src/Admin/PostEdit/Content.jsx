import React from 'react'


const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const Content = ({ label, field }) => {
  const [edit, setEdit] = useState(true);
  const [content, setContent] = useState(field);
  const { id } = useParams();

  const handleUpdate = async () => {
    let resp = await fetch(`${APP_URL}/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: {
        "content-Type": "application/json",
      },
    });
    resp = await resp.json();
    alert(resp.message);
    setEdit(false);
    setContent("");
  };

  return (
    <div className=" border bg-gray-200  h-44  justify-center items-center flex flex-col gap-3 p-2 m-2 rounded-lg ">
      <label className=" mt-2 font-semibold">{label}</label>
      <input
        type="text"
        className="p-3 border rounded w-full flex  focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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

export default Content

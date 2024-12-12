import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageChapter = () => {
  const [record, setRecord] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filterRecords, setFilterRecords] = useState([]);

  useEffect(() => {
    async function fetchChapter() {
      try {
        const url = `http://127.0.0.1:8000/api/chapter`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecord(data.data);
        setFilterRecords(data.data);
        console.log("Fetched Chapters:", data.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }
    fetchChapter();
  }, []);
  const handleDelete = async (id) => {
    let resp = await fetch(`http://127.0.0.1:8000/api/chapter/${id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      console.log(`chapter ${id} deleted successfully`);
    } else {
      console.error("failed to delete course", resp);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = record.filter(
      (chapter) =>
        chapter.chapter_name.toLowerCase().includes(query) ||
        chapter.chapter_description.toLowerCase().includes(query)
    );
    setFilterRecords(filtered);
  };
  return (
    <div className="relative overflow-x-auto w-full py-10 px-8">
      <h2 className="text-lg font-bold text-gray-700 border-l-4 border-teal-600 p-1">
        Manage Chapter
      </h2>

      <div className="flex flex-col md:flex-row justify-between md:items-center py-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border rounded w-full md:w-64 focus:outline-none"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to={"/admin/insertchapter/:id/:slug"}>
          <button className="px-4 py-2 font-semibold text-white bg-teal-500 rounded hover:bg-teal-600 w-full md:w-auto">
            Insert Chapter
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Chapter Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filterRecords.map((chapter) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={chapter.id}
              >
                <td className="px-6 py-4">{chapter.id}</td>
                <td className="px-6 py-4">{chapter.chapter_name}</td>
                <td className="px-6 py-4">{chapter.chapter_description}</td>
                <td className="px-6 py-4">{chapter.chapter_slug}</td>
                <td className="px-6 py-4 gap-3 flex ">
                  <button className="text-blue-500 hover:underline mr-2">
                    Edit
                  </button>
                  <button
                    className="ml-2 text-red-500 hover:underline"
                    onClick={() => handleDelete(chapter.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/inserttopic/${chapter.id}/${chapter.chapter_slug}`}
                    className=" text-white px-2 py-2 bg-teal-500
                     text-center"
                  >
                    Add Topic
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filterRecords.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No chapters found matching your search.
          </p>
        )}
        ;
      </div>
    </div>
  );
};

export default ManageChapter;

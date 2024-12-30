import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

const ManageCourse = () => {
  const [record, setRecord] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const url = `http://127.0.0.1:8000/api/courses`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecord(data.data);
        setCourseCount(data.data.length);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourse();
  }, []);

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the courses based on the search query
  const filteredCourses = record.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete request
  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        setRecord(record.filter(course => course.id !== id)); // Update state after deletion
        console.log(`Course ${id} deleted successfully`);
      } else {
        console.error("Failed to delete course", resp);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto w-full py-6 px-8 overflow-scroll h-screen">
      <h2 className="text-lg font-bold text-gray-700 border-l-4 border-teal-600 p-1">
        Manage Course
        <span>({courseCount})</span>
      </h2>

      <div className="flex flex-col md:flex-row justify-between md:items-center py-4 space-y-4 md:space-y-0">
        <input
          type="text"
          value={searchQuery} // Bind input value to state
          onChange={handleSearchChange} // Update state on input change
          placeholder="Search..."
          className="p-2 border rounded w-full md:w-64 focus:outline-none"
        />
        <Link to={"/admin/insertcourse"}>
          <button className="px-4 py-2 font-semibold text-white bg-teal-500 rounded hover:bg-teal-600 w-full md:w-auto">
            Insert Course
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Course Name</th>
              <th scope="col" className="px-6 py-3">Course Description</th>
              <th scope="col" className="px-6 py-3">Course Image</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={course.id}>
                  <td className="px-6 py-4">{course.id}</td>
                  <td className="px-6 py-4">{course.title}</td>
                  <td className="px-6 py-4">{parse(course.description)}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://127.0.0.1:8000/storage/${course.image}`}
                      className="w-16 h-16"
                      alt="Course Thumbnail"
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="ml-2 text-white bg-red-600 hover:underline p-2 rounded-md"
                      onClick={() => handleDelete(course.id)}
                      title="Delete"
                    >
                      <MdDelete size={22} />
                    </button>
                    <Link to={`/admin/managecourse/courseedit/${course.id}/${course.course_slug}`}>
                      <button className="text-white px-2 py-2 bg-teal-500 text-center rounded-md" title="Edit">
                        <FiEdit size={22} />
                      </button>
                    </Link>
                    <Link
                      to={`/admin/managecourse/${course.id}/${course.course_slug}`}
                      className="text-white px-2 py-2 bg-teal-500 rounded-md text-center"
                      title="View"
                    >
                      <HiOutlineViewfinderCircle size={22} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No courses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourse;

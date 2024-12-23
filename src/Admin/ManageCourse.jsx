import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrChapterAdd } from "react-icons/gr";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";

import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

import parse from 'html-react-parser';

const ManageCourse = () => {
 
  const [record, setRecord] = useState([]);
  
  const [courseCount, setCourseCount] = useState(0);


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
        console.log(record);
        setCourseCount(data.data.length);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourse();
  }, []);

  const handleDelete = async (id) => {
    let resp = await fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      console.log(`course ${id} deleted successfully`);
    } else {
      console.error("failed to delete course", resp);
    }
  };
  return (
    <div className="relative overflow-x-auto w-full py-6 px-8">
      
      <h2 className="text-lg font-bold text-gray-700 border-l-4 border-teal-600 p-1">
        Manage Course
        <span>({courseCount})</span>
      </h2>


      <div className="flex flex-col md:flex-row justify-between md:items-center py-4 space-y-4 md:space-y-0">
        <input
          type="text"
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
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3">
                Course Description
              </th>
              <th scope="col" className="px-6 py-3">
                Course Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {record.map((course) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={course.id}
              >
                <td className="px-6 py-4">{course.id}</td>
                <td className="px-6 py-4">{course.title}</td>
                <td className="px-6 py-4">{parse (course.description)}</td>
                <td className="px-6 py-4">
                  <img
                    src={`http://127.0.0.1:8000/storage/${course.image}`}
                    className="w-16 h-16"
                  />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    className="ml-2 text-white bg-red-600 hover:underline p-2 rounded-md "
                    onClick={() => handleDelete(course.id)}
                    title="delete"
                  >
                    <MdDelete size={22} />
                  </button>
                  <Link to={`/admin/managecourse/courseedit/${course.id}/${course.course_slug}`}>
                    <button
                      className=" text-white px-2 py-2 bg-teal-500
                     text-center rounded-md "
                      title="edit"
                    >
                      <FiEdit size={22} />
                    </button>
                  </Link>

                  
                  <Link
                    to={`/admin/managecourse/${course.id}/${course.course_slug}`}
                    className="   text-white px-2 py-2 bg-teal-500 rounded-md
                     text-center"
                    title="view"
                  >
                    <HiOutlineViewfinderCircle size={22} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourse;

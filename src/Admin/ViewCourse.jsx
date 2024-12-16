import React, { useEffect, useState } from "react";
import { GrChapterAdd } from "react-icons/gr";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const ViewCourse = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null); // State for course details
  const [chapters, setChapters] = useState([]); // State for chapters
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [chapterCount, setChapterCount] = useState(0);
  

  useEffect(() => {
    const fetchCourseAndChapters = async () => {
      try {
        // Fetch course details
        const courseResponse = await fetch(
          `http://127.0.0.1:8000/api/courses/${id}`
        );
        const courseData = await courseResponse.json();

        if (courseResponse.ok) {
          setRecord(courseData.data || null);
          setChapters(courseData.data.chapters || []);
          setChapterCount(courseData.data.chapters.length);
        } else {
          setError(courseData.message || "Failed to fetch course details.");
          return;
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndChapters();
  }, [id]);
  const handleDelete = async (id) => {
    let resp = await fetch(`http://127.0.0.1:8000/api/chapter/${id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      console.log(`chapter ${id} deleted successfully`);
    } else {
      console.error("failed to delete chapter", resp);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>No course data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 p-10 flex">
      {/* Left Side: Course Details */}
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex-1">
        {record.image && (
          <img
            src={`http://127.0.0.1:8000/storage/${record.image}`}
            alt={record.title || "Course"}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {record.title}
          </h1>
          <p className="text-gray-600 mb-6">{record.description}</p>
        </div>
      </div>

      {/* Right Side: Chapters */}
      <div className="bg-gray-300 flex-1 p-6">
        <div className="border-b-2  px-6 py-2 flex  justify-between items-center ">
          <h2 className="text-xl font-bold text-gray-700 ">Chapters
            <span>({chapterCount})</span>
          </h2>
          <Link
            to={`/admin/insertchapter/${record.id}`}
            className=" text-white px-2 py-2 bg-teal-500 rounded-md
                     text-center"
            title="add chapter"
          >
            <GrChapterAdd size={22} />
          </Link>
        </div>
        {chapters.length > 0 ? (
          <ul className="list-disc pl-6">
            {chapters.map((chapter, index) => (
              <li key={index} className="text-gray-800 mb-4 ">
                <span>{chapter.order}</span>
                <h3 className="text-lg font-semibold">
                  {chapter.chapter_name}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-3">
                  {chapter.chapter_description}
                </p>
                <div className="flex gap-3">
                  <button
                    className="ml-2 text-white bg-red-600 hover:underline p-2 rounded-md "
                    onClick={() => handleDelete(chapter.id)}
                    title="delete"
                  >
                    <MdDelete size={22} />
                  </button>
                  <Link
                    to={`/admin/viewchapter/${chapter.id}`}
                    className="   text-white px-2 py-2 bg-teal-500 rounded-md
                                     text-center"
                    title="view"
                  >
                    <HiOutlineViewfinderCircle size={22} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">
            No chapters available for this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewCourse;

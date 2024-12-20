import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";

const SingleViewPage = () => {
  const { id } = useParams();
  const [record, setRecord] = useState({});
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/courses/${id}/show`
        );
        const courseData = await response.json();

        if (response.ok) {
          setRecord(courseData.data || {});
          setChapters(courseData.data.chapters || []);
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

    fetchCourse();
  }, [id]);

  return (
    <div className="w-full flex items-center justify-center  gap-5 flex-col  ">
      <div className="bg-white  overflow-hidden max-w-3xl text-center  w-4/12 border ">
        {record.image && (
          <img src={record.image} alt="" className="w-full h-64 object-cover shadow rounded-lg hover:shadow-lg" />
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {record.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {record.description}
          </p>
        </div>
      </div>

      {/* Dropdown Section */}
      <div className="flex flex-col gap-3 w-full max-w-3xl">
        <h1 className="text-4xl font-semibold">
          Beginner's Guide to {record.title}
        </h1>
        <p className="text-md">
          These tutorials will provide you with a solid foundation in Python and
          prepare you for your career goals.
        </p>
        <div className="border bg-white">
          {chapters.map((chapter, index) => (
            <div key={chapter.id}>
              <p
                className="px-3 py-4 flex items-center justify-between border-b cursor-pointer"
                onClick={() => toggleDropdown(index)}
              >
                <span>{chapter.chapter_name}</span>
                <RiArrowDropDownLine
                  size={22}
                  className={`transform transition-transform ${
                    openDropdown === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </p>

              {openDropdown === index && (
                <div className="px-3 py-2 bg-gray-100">
                  {chapter.topics && chapter.topics.length > 0 ? (
                    chapter.topics.map((topic) => (
                      <NavLink
                        to={`/allcontents/${topic.id}/${topic.topic_slug}`}
                        key={topic.id}
                        className=" rounded cursor-pointer "
                      >
                        <p className="px-5 py-3 shadow hover:shadow-lg">
                          <span>{topic.topic_name}</span>
                        </p>
                      </NavLink>
                    ))
                  ) : (
                    <span>No topics available for this chapter.</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleViewPage;

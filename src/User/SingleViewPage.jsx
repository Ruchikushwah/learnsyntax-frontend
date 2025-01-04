import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import parse from "html-react-parser";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const SingleViewPage = () => {
  const { courseId } = useParams();
  const [record, setRecord] = useState({});
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${APP_URL}/api/courses/${courseId}/show`
        );
        const courseData = await response.json();
        // console.log(courseData);
        if (response.ok) {
          setRecord(courseData.data || {});
          setChapters(courseData.data.chapters || []);
          setSelectedChapter(courseData.data.chapters[0] || null); // Default to first chapter
        } else {
          setError(courseData.message || "Failed to fetch course details.");
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto">
    {/* Course Banner */}
    <div className="w-full h-32 flex flex-1 mb-8"></div>
  
    {/* Course Info */}
    <div className="flex flex-col items-center mb-10">
      <div className="bg-white overflow-hidden max-w-3xl text-center w-full border rounded-md shadow-md flex justify-center items-center flex-col">
        {record.image && (
          <img
            src={`${APP_URL}/storage/${record.image}`}
            alt={record.title}
            className="w-32 h-28 object-contain shadow-sm"
          />
        )}
        <div className="p-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutralDGrey mb-4">
            {record.title}
          </h1>
          <p className="text-sm sm:text-lg text-neutralGrey">
            {parse(record.description)}
          </p>
        </div>
      </div>
    </div>
  
    {/* Chapters and Topics */}
    <div className="flex flex-col lg:flex-row gap-8 mb-8 mt-6">
      {/* Chapters List */}
      <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-md shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-neutralDGrey mb-6">
          Chapters
        </h2>
        <ul className="space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
          {chapters.map((chapter) => (
            <li
              key={chapter.id}
              className={`p-4 rounded-md cursor-pointer hover:bg-gray-100 ${
                selectedChapter?.id === chapter.id
                  ? "bg-[#E8F5E9] border-l-4 border-[#4c973d]"
                  : "bg-white"
              }`}
              onClick={() => setSelectedChapter(chapter)}
            >
              <h3 className="text-md sm:text-lg font-semibold text-neutralDGrey">
                {chapter.chapter_name}
              </h3>
              <p className="text-xs sm:text-sm text-neutralGrey line-clamp-2">
                {parse(chapter.chapter_description)}
              </p>
            </li>
          ))}
        </ul>
      </div>
  
      {/* Topics List */}
      <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-md shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-neutralDGrey mb-6">
          {selectedChapter?.chapter_name || "Select a Chapter"}
        </h2>
        {selectedChapter && selectedChapter.topics?.length > 0 ? (
          <ul className="space-y-4">
            {selectedChapter.topics.map((topic) => (
              <li key={topic.id}>
                <NavLink
                  to={`/allcontents/${record.id}/${record.course_slug}/${selectedChapter.id}/${selectedChapter.chapter_slug}/${topic.id}/${topic.topic_slug}`}
                  className="block p-4 rounded-md shadow hover:shadow-lg transition-all duration-300 hover:border-b-4 hover:border-indigo-700"
                >
                  <h3 className="text-md sm:text-lg font-semibold text-neutralDGrey">
                    {topic.topic_name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutralGrey line-clamp-2">
                    {parse(topic.topic_description)}
                  </p>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutralGrey">No topics available for this chapter.</p>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default SingleViewPage;

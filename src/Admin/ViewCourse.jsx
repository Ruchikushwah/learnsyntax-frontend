import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrChapterAdd } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link, useParams, useSearchParams } from "react-router-dom";

const ViewCourse = () => {
  const { id, course_slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [record, setRecord] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course and chapters - now reuses the previous selection
  const fetchCourseAndChapters = async (preserveSelectedChapterId = null) => {
    setLoading(true);
    try {
      const courseResponse = await fetch(
        `http://127.0.0.1:8000/api/courses/${id}`
      );
      const courseData = await courseResponse.json();

      if (courseResponse.ok) {
        const chaptersWithTopics = await Promise.all(
          courseData.data.chapters.map(async (chapter) => {
            const topicsResponse = await fetch(
              `http://127.0.0.1:8000/api/chapters/${chapter.id}/topics`
            );
            const topicsData = await topicsResponse.json();
            return { ...chapter, topics: topicsData.data || [] };
          })
        );

        setRecord(courseData.data || null);
        setChapters(chaptersWithTopics);

        // Get the chapterId from the query params if available
        const chapterIdFromURL = searchParams.get("chapterId");

        const currentChapter = chaptersWithTopics.find(
          (chapter) =>
            chapter.id ===
            (preserveSelectedChapterId || parseInt(chapterIdFromURL, 10))
        );
        setSelectedChapter(currentChapter || chaptersWithTopics[0] || null);
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

  // Call fetchCourseAndChapters on component mount
  useEffect(() => {
    fetchCourseAndChapters();
  }, [id]);

  // Handle chapter deletion
  const handleDelete = async (chapterId) => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/api/chapter/${chapterId}`,
        {
          method: "DELETE",
        }
      );
      if (resp.ok) {
        console.log(`Chapter ${chapterId} deleted successfully`);
        setChapters(chapters.filter((chapter) => chapter.id !== chapterId));

        // Reset selected chapter to null if the currently selected chapter is deleted
        if (selectedChapter && selectedChapter.id === chapterId) {
          setSelectedChapter(null);
        }
      } else {
        console.error("Failed to delete chapter", resp);
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  // Handle topic deletion
  const handleDeleteTopic = async (chapterId, topicId) => {
    try {
      const url = `http://127.0.0.1:8000/api/chapters/${chapterId}/topics/${topicId}`;
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        console.log(`Topic ${topicId} deleted successfully`);

        // Re-fetch course and chapters after deleting a topic
        fetchCourseAndChapters(selectedChapter?.id);
      } else {
        console.error("Failed to delete topic", response);
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
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
    <div className="w-full bg-gray-100 p-10 flex h-screen  ">
      {/* Left Side: Chapters */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 max-w-sm ">
        <div className="border-b-2 px-6 py-2 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-700">Chapters</h2>
          <Link
            to={`/admin/insertchapter/${record.id}`}
            className="text-white px-2 py-2 bg-teal-500 rounded-md"
          >
            <GrChapterAdd size={22} />
          </Link>
        </div>

        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`p-4 cursor-pointer ${
              chapter.id === selectedChapter?.id ? "bg-teal-200" : ""
            }`}
            onClick={() => {
              setSelectedChapter(chapter);
              setSearchParams({ chapterId: chapter.id }); // <-- Update the URL param
            }}
          >
            <h3 className="text-lg font-semibold">{chapter.chapter_name}</h3>
            <p className="text-gray-600 line-clamp-3 mb-3">
              {chapter.chapter_description}
            </p>
          <div className="flex gap-3">
          <button
              className="text-white bg-red-600 p-2 rounded-md"
              onClick={() => handleDelete(chapter.id)}
            >
              <MdDelete size={22} />
            </button>
            <Link
              to={`/admin/managecourse/chapteredit/${chapter.id}/${chapter.chapter_slug}`}
            >
              <button
                className=" text-white px-2 py-2 bg-teal-500 text-center rounded-md "
                title="edit"
              >
                <FiEdit size={22} />
              </button>
            </Link>
          </div>
          </div>
        ))}
      </div>

      {/* Right Side: Topics */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 ml-6">
        {selectedChapter ? (
          <div>
            <div className="flex justify-between items-center p-6">
              <h2 className="text-xl font-bold text-gray-700">
                Topics in {selectedChapter.chapter_name}
              </h2>
              <Link
                to={`/admin/inserttopic/${selectedChapter.id}?chapterId=${selectedChapter.id}`}
                className="text-white px-2 py-2 bg-teal-500 rounded-md"
              >
                Add Topic
              </Link>
            </div>

            {selectedChapter.topics.map((topic) => (
              <div key={topic.id} className="p-4 border-b">
                <h4 className="font-semibold">{topic.topic_name}</h4>
                <p className="text-gray-600 mb-2">{topic.topic_description}</p>
                <button
                  className="text-red-500"
                  onClick={() =>
                    handleDeleteTopic(selectedChapter.id, topic.id)
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-6 text-gray-600">
            Select a chapter to view its topics.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewCourse;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const AllContents = () => {
  const { id, chapterId, topicId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // Controls which accordion is open

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}/show`);
        const courseData = await response.json();

        if (response.ok) {
          const chaptersData = courseData.data.chapters || [];
          setChapters(chaptersData);

          // Find and set the selected chapter
          const initialChapter = chaptersData.find((ch) => ch.id.toString() === chapterId);
          setSelectedChapter(initialChapter || null);

          // Find and set the selected topic and post
          const initialTopic =
            initialChapter?.topics.find((tp) => tp.id.toString() === topicId) || null;
          setSelectedTopic(initialTopic);
          setSelectedPost(initialTopic?.post?.[0] || null); // Use the first post from the array

          // Open the accordion for the selected chapter
          const chapterIndex = chaptersData.findIndex((ch) => ch.id.toString() === chapterId);
          setOpenDropdown(chapterIndex >= 0 ? chapterIndex : null);
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

    fetchCourseData();
  }, [id, chapterId, topicId]);

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setSelectedPost(topic.post?.[0] || null); // Update post when a topic is selected
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full flex gap-5 px-8 py-6 mt-12">
      {/* Left Panel: Chapters and Topics */}
      <div className="w-4/12 bg-gray-50 p-4 rounded-md shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chapters</h2>
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="mb-4">
            {/* Chapter Header */}
            <p
              className="flex items-center justify-between p-4 bg-white border rounded-md cursor-pointer shadow-sm hover:shadow-md"
              onClick={() => toggleDropdown(index)}
            >
              <span className="text-lg font-semibold">{chapter.chapter_name}</span>
              <RiArrowDropDownLine
                size={22}
                className={`transform transition-transform ${
                  openDropdown === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </p>

            {/* Topics Accordion */}
            {openDropdown === index && (
              <div className="mt-2 bg-gray-50">
                {chapter.topics?.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicClick(topic)}
                    className={`p-3 mx-2 my-1 rounded-md cursor-pointer hover:bg-gray-100 ${
                      selectedTopic?.id === topic.id
                        ? "bg-indigo-50 border-l-4 border-indigo-600"
                        : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {topic.topic_name}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {topic.topic_description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Panel: Post Content */}
      <div className="w-8/12 bg-white p-6 rounded-md shadow-2xl">
        {selectedPost ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedPost.title}
            </h2>
            {selectedPost.image_path && (
              <img
                src={selectedPost.image_path}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <p className="text-gray-700">{selectedPost.content}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Select a topic to view its content.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllContents;

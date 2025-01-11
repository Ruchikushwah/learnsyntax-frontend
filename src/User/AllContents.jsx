import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import FlowbiteStepper from './FlowbiteStepper'; 
import parse from 'html-react-parser';


const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const AllContents = () => {
  const { id, chapterId, topicId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [visitedTopics, setVisitedTopics] = useState([]); // Track visited topics

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${APP_URL}/api/courses/${id}/show`);
        const courseData = await response.json();

        if (response.ok) {
          const chaptersData = courseData.data.chapters || [];
          setChapters(chaptersData);

          const initialChapter = chaptersData.find((ch) => ch.id.toString() === chapterId);
          setSelectedChapter(initialChapter || null);

          const initialTopic =
            initialChapter?.topics.find((tp) => tp.id.toString() === topicId) || null;
          setSelectedTopic(initialTopic);
          setSelectedPost(initialTopic?.post?.[0] || null);

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
    setSelectedPost(topic.post?.[0] || null);
    // Mark the topic as visited
    if (!visitedTopics.includes(topic.id)) {
      setVisitedTopics((prev) => [...prev, topic.id]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row w-full flex gap-5 px-8 py-6 mt-12">
      <div className="lg:w-4/12 w-full bg-gray-50 p-4 rounded-md shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chapters</h2>
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="mb-4">
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
            {openDropdown === index && (
              <div className="flex mt-2 bg-gray-50">
                <FlowbiteStepper
                  topics={chapter.topics}
                  selectedTopic={selectedTopic}
                  visitedTopics={visitedTopics} // Pass the visitedTopics state
                />
                <div className="ml-4 w-full">
                  {chapter.topics?.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className={`p-3 my-1 rounded-md cursor-pointer hover:bg-gray-100 ${
                        selectedTopic?.id === topic.id
                          ? "bg-indigo-50 border-l-4 border-indigo-600"
                          : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-800">{topic.topic_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
{/* Main Content */}
<div className="lg:w-8/12 bg-white p-6 rounded-md shadow-2xl">
  {selectedTopic ? (
    selectedTopic.post && selectedTopic.post.length > 0 ? (
      selectedTopic.post.map((post) => (
        <div key={post.id} className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h2>
          <p className="text-gray-700">{parse(post.content)}</p>
          {post.image_path && (
            <img
              src={`${APP_URL}/storage/${post.image_path}`}
              alt={post.title}
              className="w-[460px] h-[400px] object-contain rounded-md mb-4 mx-auto"
            />
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">No posts available for this topic.</p>
    )
  ) : (
    <p className="text-gray-500 text-center">Select a topic to view its posts.</p>
  )}
</div>

    </div>
  );
};

export default AllContents;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiArrowDropDownLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import FlowbiteStepper from './FlowbiteStepper';
import parse from 'html-react-parser';
import { Helmet } from "react-helmet-async";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the drawer

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

  // Close drawer when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setIsDrawerOpen(false); // Close drawer when a topic is clicked
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row w-full flex gap-5 px-8 py-6 mt-12">
      <Helmet>
        <title>{selectedTopic?.topic_name || "All Contents"}</title>
        <meta
          name="description"
          content={selectedPost?.title || "Explore course topics and content."}
        />
      </Helmet>
      {/* Hamburger for Mobile */}
      <div className="lg:hidden mb-4">
        <RiMenuLine
          size={30}
          className="cursor-pointer text-gray-800"
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-4/12 w-full bg-gray-50 p-4 rounded-md shadow-2xl">
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
                className={`transform transition-transform ${openDropdown === index ? "rotate-180" : "rotate-0"
                  }`}
              />
            </p>
            {openDropdown === index && (
              <div className="flex mt-2 bg-gray-50">
                <FlowbiteStepper
                  topics={chapter.topics}
                  selectedTopic={selectedTopic}
                  visitedTopics={visitedTopics}
                  handleTopicClick={handleTopicClick}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="lg:hidden w-3/4 bg-gray-50 mt-14 h-full p-4 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Chapters</h2>
              <RiCloseLine
                size={30}
                className="cursor-pointer text-gray-800"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <div key={chapter.id} className="mb-4">
                  <p
                    className="flex items-center justify-between p-4 bg-white border rounded-md cursor-pointer shadow-sm hover:shadow-md"
                    onClick={() => toggleDropdown(index)}
                  >
                    <span className="text-lg font-semibold">{chapter.chapter_name}</span>
                    <RiArrowDropDownLine
                      size={22}
                      className={`transform transition-transform ${openDropdown === index ? "rotate-180" : "rotate-0"
                        }`}
                    />
                  </p>
                  {openDropdown === index && (
                    <div className="flex flex-col mt-2 bg-gray-50 overflow-y-auto max-h-60 p-2">
                      <FlowbiteStepper
                        topics={chapter.topics}
                        selectedTopic={selectedTopic}
                        visitedTopics={visitedTopics}
                        handleTopicClick={handleTopicClick}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:w-8/12 bg-white p-6 rounded-md shadow-2xl">
        {selectedPost ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedPost.title}</h2>
            <p className="text-gray-700">{parse(selectedPost.content)}</p>
            {selectedPost.image_path && (
              <img
                src={`${APP_URL}/storage/${selectedPost.image_path}`}
                alt={selectedPost.title}
                className="w-[460px] h-[400px] object-contain rounded-md mb-4"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Select a topic to view its content.</p>
        )}
      </div>
    </div>
  );
};

export default AllContents;

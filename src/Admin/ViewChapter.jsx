import React, { useEffect, useState } from "react";
import { GrChapterAdd } from "react-icons/gr";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const ViewChapter = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicCount, setTopicCount] = useState(0);

  const APP_URL = import.meta.env.VITE_REACT_APP_URL;

  useEffect(() => {
    const fetchChaptersAndTopic = async () => {
      try {
        // Fetch chapters details
        const Response = await fetch(
          `${APP_URL}/api/chapters/${id}/show`
        );
        const chapterData = await Response.json();

        if (Response.ok) {
          setRecord(chapterData.data || null);

          setTopics(chapterData.data.topic || []);
          setTopicCount(chapterData.data.topic.length);
        } else {
          setError(chapterData.message || "Failed to fetch chapter details.");
          return;
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChaptersAndTopic();
  }, [id]);
  const handleDelete = async (id) => {
    let resp = await fetch(`${APP_URL}/api/topic/${id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      console.log(`TOPIC ${id} deleted successfully`);
    } else {
      console.error("failed to delete topic", resp);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="  w-16 h-16 ">
          <BeatLoader color=" #14b8a6" />
        </div>
      </div>
    );
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
    <div className="w-full bg-gray-100 p-10 ">
      {/* Left Side: Chapters Details */}

      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {record.chapter_name}
          </h1>
          <p className="text-gray-600 mb-6">{record.chapter_description}</p>
        </div>
      </div>

      {/* Right Side: chpters */}
      <div className="bg-gray-300 flex-1 p-6">
        <div className="border-b-2  px-6 py-2 flex  justify-between items-center ">
          <h2 className="text-xl font-bold text-gray-700 ">
            Topics
            <span>({topicCount})</span>
          </h2>
          <Link
            to={`/admin/inserttopic/${record.id}`}
            className=" text-white px-2 py-2 bg-teal-500 rounded-md
                     text-center"
            title="Add Topic"
          >
            <GrChapterAdd size={22} />
          </Link>
        </div>
        {topics.length > 0 ? (
          <ul className="list-disc pl-6">
            {topics.map((topic, index) => (
              <li key={index} className="text-gray-800 mb-4 ">
                <span>{topic.order}</span>
                <h3 className="text-lg font-semibold">{topic.topic_name}</h3>
                <p className="text-gray-600 line-clamp-3 mb-3">
                  {topic.topic_description}
                </p>
                <div className="flex gap-3">
                  <button
                    className="ml-2 text-white bg-red-600 hover:underline p-2 rounded-md "
                    onClick={() => handleDelete(topic.id)}
                    title="delete"
                  >
                    <MdDelete size={22} />
                  </button>
                  <Link
                    to={`/admin/managecourse/${topic.id}`}
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
          <p className="text-gray-600">No Topics Available for this Chapter.</p>
        )}
      </div>
    </div>
  );
};

export default ViewChapter;

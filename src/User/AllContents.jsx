import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

const AllContents = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown
  };

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/chapters/${id}/show`
        );
        const chapterData = await response.json();
        

        if (response.ok) {

          // const mydata = chapterData.data.topics; // This contains the `data` field
          // console.log("Chapter Data: new one", mydata);

          setChapters(chapterData.data || []);

          setTopics(chapterData.data.topics);
          console.log('ruchi',chapterData.data.topics);
        } else {
          setError(chapterData.message || "Failed to fetch course details.");
          return;
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchChapter();
  }, [id]);

  return (
    <div className="w-full flex gap-5 m-14">
      <div className="flex w-4/12 bg-gray-100">
        <div className="border bg-white">
          {chapters.map((chapter) => (
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

             
            </div>
          ))}
        </div>
      </div>
      <div className=" flex w-8/12">
        <div className="px-3 py-2 bg-gray-100">
          {topics.post && topics.post.length > 0 ? (
            topics.posts.map((post) => (
              
                <p className="px-5 py-3 shadow hover:shadow-lg">
                  <span>{post.title}</span>
                </p>
             
            ))
          ) : (
            <span>No post available for this topics.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllContents;

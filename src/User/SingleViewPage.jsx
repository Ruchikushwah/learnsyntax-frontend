import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

const SingleViewPage = () => {
  const {id}=useParams();
  const[record,setRecord]=useState([]);
  const[chapters,setChapters] =useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topics,setTopics] = useState([]);

  
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown
  };

  useEffect(() => {
      const fetchCourse = async () => {
        try {
          // Fetch chapters details
          const Response = await fetch(
            `http://127.0.0.1:8000/api/courses/${id}/show`
          );
          const courseData = await Response.json();
  
          if (Response.ok) {
            setRecord(courseData.data || null);
           
            setChapters(courseData.data.chapters || []);
            setTopics(courseData.chapters.data.topics);
            
            
      
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
  const dropdownItems = [
    {
      id: 1,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, impedit fugit assumenda laudantium ",
      content: "Additional information for item 1 goes here.",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, impedit fugit assumenda laudantium .",
      content: "Additional information for item 2 goes here.",
    },
  ];

  return (
    <div className=" w-full  flex items-center justify-center  flex-col gap-5  flex-1">
      
      <div className="bg-white shadow rounded-lg overflow-hidden  max-w-3xl text-center hover:shadow-lg">
        {record.image && (
          <img
            src={record.image}
            alt=""
            className="w-full h-64 object-cover"
          />
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
        <h1 className="text-4xl font-semibold">Beginner's Guide to Python</h1>
        <p className="text-md">
          These tutorials will provide you with a solid foundation in Python and
          prepare you for your career goals.
        </p>
        <div className="border bg-white">
          {chapters.map((chapter,index) => (
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
                  <p>{chapter.chapter_description}</p>
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

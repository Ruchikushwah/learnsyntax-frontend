import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const AllCourses = () => {

const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async()=>{       
    try {
        const url = `${APP_URL}/api/courses`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.data);
       
        
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div id="course" className="md:px-14 max-w-screen-2xl mx-auto">
      {/* Header Section */}
      <div className="mt-20 md:w-1/2 mx-auto text-center">
        <h2 className="text-4xl tracking-tight font-extrabold text-neutralDGrey mb-2">
          Our <span className="text-brandPrimary">Courses</span>
        </h2>
        <p className="text-neutralGrey">
          LearnSyntax will enhance your learning experience the way you
          interact.
        </p>
      </div>

      {/* Courses Section */}
      <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
        {courses.length > 0 ? (
          courses.map((course) => (
            <NavLink
              to={`/singleviewpage/${course.id}/${course.course_slug}`}
              key={course.id}
              className="p-5 shadow rounded cursor-pointer hover:shadow-lg"
            >
              <div
                className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow cursor-pointer 
                    hover:-translate-y-5 hover:border-b-4 hover:border-brandPrimary transition-all duration-300 flex items-center justify-center h-full"
              >
                <div>
                  <div className="bg-[#E8F5E9] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">

                    <img
                      src={`${APP_URL}/storage/${course.image}`}

                      alt={course.title || "Course Icon"}
                      className="-ml-5 h-full object-contain"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-neutralDGrey mb-2 px-2">
                    {course.title}
                  </h4>
                  <p className="text-sm text-neutralGrey line-clamp-4">
                    {parse(course.description)}
                  </p>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <p className="col-span-full text-center text-white bg-slate-500 py-4 text-2xl">
            No Courses Available.
          </p>
        )}
      </div>

     
    </div>
  );
};

export default AllCourses;

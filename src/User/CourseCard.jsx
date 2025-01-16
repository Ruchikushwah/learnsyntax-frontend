import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const CourseCard = ({ courses = [] }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  // Initial visible courses count
  const navigate = useNavigate();

  const showMoreCourses = () => {
    // setVisibleCount(visibleCount + 6); 
    // Increase visible courses by 6
    navigate("/courses");
  };

  // const showLessCourses = () => {
  //   setVisibleCount(6); // Reset to initial count
  // };

  return (
    <div id="course" className="md:px-14 max-w-screen-2xl mx-auto">
      {/* Header Section */}
      <div className="mt-20 md:w-1/2 mx-auto text-center">
        <h2 className="text-4xl tracking-tight font-extrabold text-neutralDGrey mb-2">
          Popular <span className="text-brandPrimary">Courses</span>
        </h2>
        <p className="text-neutralGrey">
          LearnSyntax will enhance your learning experience the way you
          interact.
        </p>
      </div>

      {/* Courses Section */}
      <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-10/12 mx-auto gap-12">
        {courses.length > 0 ? (
          courses.slice(0, visibleCount).map((course) => (
            <NavLink
              to={`/singleviewpage/${course.id}/${course.course_slug}`}
              key={course.id}
              className="p-5 shadow rounded cursor-pointer hover:shadow-lg"
            >
              <div
                key={course.id}
                className="px-4 py-5 text-center md:w-[300px] mx-auto md:h-80 rounded-md cursor-pointer 
                    hover:-translate-y-5 hover:border-b-4 hover:border-brandPrimary transition-all duration-300 flex items-center justify-center h-full"
              >
                <div>
                  <div className="bg-[#ccdce8a4] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">

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
      <div className="text-center mt-8">
        <button
          onClick={showMoreCourses}
          className="px-6 py-2 bg-brandPrimary text-white rounded hover:bg-brandSecondary transition-all mx-2"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

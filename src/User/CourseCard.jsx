
import { NavLink } from "react-router-dom";

const CourseCard = ({ courses = [] }) => {
  console.log("data what we getting" + courses);

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 m-4">
      {courses.length > 0 ? (
        courses.map((course) => (
          <NavLink
            to={`/singleviewpage/${course.id}/${course.course_slug}`}
            key={course.id}
            className="p-5 shadow rounded cursor-pointer hover:shadow-lg"
          >
            <div>
              <img
                src={`http://127.0.0.1:8000/storage/${course.image}`}
                alt={course.title}
                className="w-full p-3"
              />
            </div>
            <h3 className="mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer">
              {course.title}
            </h3>
            <p className="mb-2 text-gray-600 line-clamp-3">
              {course.description}
            </p>
          </NavLink>
        ))
      ) : (
        <p className="col-span-full items-center text-center text-white bg-slate-500 py-4 text-2xl">
          No Courses Available.
        </p>
      )}
    </div>
  );
};

export default CourseCard;

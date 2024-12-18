import React from "react";

const SingleViewPage = () => {
  
  const course = {
    course_name: "React Fundamentals",
    course_description:
      "This course covers the fundamental concepts of React, including components, state, props, and hooks. Build interactive user interfaces with ease!",
    course_image: "https://via.placeholder.com/600x300", // Placeholder image
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 ">
     
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl text-center">
       
        {course.course_image && (
          <img
            src={course.course_image}
            alt="Course"
            className="w-full h-64 object-cover"
          />
        )}

        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {course.course_name}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {course.course_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleViewPage;

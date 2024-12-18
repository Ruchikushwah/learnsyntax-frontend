import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';

const Home = () => {
   const [courses, setCourses] = useState([]);

   useEffect(() => {
     async function fetchCourses() {
       let url = `http://127.0.0.1:8000/api/courses`;
       const response = await fetch(url);
       const data = await response.json();
       setCourses(data.data);
     }

     fetchCourses();
   }, []);
  return (
    <>
      <div className="bg-white py-10 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl md:text-3xl font-semibold text-gray-900">
            The Only way to learn a new <br></br> programming language is by
            writing programs in it.
          </h1>
          

          <div className="mt-6">
            
            <div className="flex">
              <input
                type="text"
                placeholder=""
                className="w-full md:w-2/3 p-3 border rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-3 font-semibold rounded-r-md hover:bg-blue-900 hover:text-white">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="\bg-removebg-preview.png"
            alt="Programmer Illustration"
            className="w-3/4 md:w-full"
          />
        </div>
      </div>

      <div className='py-4'>
        <CourseCard courses={courses} />
      </div>
      <div className="bg-gray-100  h-[500px] flex flex-col items-center p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-700 mb-2">Code Editor</h1>
          <p className="text-gray-800 text-lg mb-8">
            With our online code editor, you can edit code and view the result
            in your browser
          </p>
          <img
            src="/codeeditor.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Home
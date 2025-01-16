import React, { useEffect, useState } from "react";
const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const WhatWeOffer = () => {
  const [inView, setInView] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Intersection Observer for Animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    const serviceSection = document.getElementById("service");
    if (serviceSection) {
      observer.observe(serviceSection);
    }
    return () => {
      if (serviceSection) {
        observer.unobserve(serviceSection);
      }
    };
  }, []);

  useEffect(() => {
    
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${APP_URL}/api/courses`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.data);
        console.log(setCourses);
        
        
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div id="service" className="md:px-14 px-4 py-10 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl tracking-tight font-extrabold text-neutralDGrey mb-2">
          Our <span className="text-brandPrimary">Courses</span>
        </h2>
        <p className="text-neutralGrey">
          LearnSyntax will enhance your learning experience the way you
          interacts.
        </p>
        <div
          className={`my-12 flex flex-wrap justify-between items-center gap-8 transform transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
          }`}
        >
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="flex flex-col items-center">
                <img
                  src={`${APP_URL}/storage/${course.image}`}
                  alt={course.title || "Course Icon"}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))
          ) : (
            <p className="text-center text-neutralGrey">
              No courses available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
